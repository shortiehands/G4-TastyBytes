# Stage 1: Build React frontend
FROM node:18-alpine AS react-build

# Set working directory for frontend
WORKDIR /g4-tastybytes/frontend

# Copy package.json and package-lock.json for frontend
COPY package.json package-lock.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Build FastAPI backend
FROM python:3.11-slim AS fastapi-build

# Set working directory for backend
WORKDIR /g4-tastybytes

# Copy the requirements file for backend
COPY requirements.txt /g4-tastybytes/

# Install backend dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY . .

# Stage 3: Serve React frontend with Nginx
FROM nginx:alpine AS nginx-frontend

# Copy the build folder from the React build stage to Nginx HTML folder
COPY --from=react-build /g4-tastybytes/frontend/build /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx to serve the React app
CMD ["nginx", "-g", "daemon off;"]

# Stage 4: Final backend setup
FROM python:3.11-slim AS backend

# Set working directory for backend
WORKDIR /g4-tastybytes

# Copy the FastAPI backend code from the build stage
COPY --from=fastapi-build /g4-tastybytes /g4-tastybytes

# Expose FastAPI port
EXPOSE 8000

# Start FastAPI with uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]