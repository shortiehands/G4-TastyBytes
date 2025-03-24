# Stage 1: Build React frontend
FROM node:18-alpine AS react-build

# Set working directory for frontend
WORKDIR /g4-tastybytes

# Copy package.json and package-lock.json for frontend
COPY package.json package-lock.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the React app
RUN npm run build

# Capture build logs
RUN ls -al /g4-tastybytes && echo "Build directory after build"

# Stage 3: Serve React frontend with Nginx
FROM nginx:alpine AS nginx-frontend

# Copy the build folder from the React build stage to Nginx HTML folder
COPY --from=react-build /g4-tastybytes/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx to serve the React app
CMD ["nginx", "-g", "daemon off;"]

# Stage 2: Build FastAPI backend
FROM python:3.11-slim AS fastapi-build

# Set working directory for backend
WORKDIR /g4-tastybytes

# Copy the requirements file for backend
COPY requirements.txt /g4-tastybytes/

# Install backend dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code
COPY . /g4-tastybytes

# Expose port for FastAPI
EXPOSE 8000

# Run uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]