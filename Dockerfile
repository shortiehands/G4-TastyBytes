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

# Stage 2: Build FastAPI backend
FROM python:3.11-slim AS fastapi-build

# Set working directory for backend
WORKDIR /g4-tastybytes

# Copy the requirements file for backend
COPY requirements.txt /g4-tastybytes/

# Install backend dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install Nginx
RUN apt-get update && apt-get install -y nginx

# Copy the rest of your application code
COPY . /g4-tastybytes

# Expose port for FastAPI and Nginx
EXPOSE 80 8000

# Copy frontend build from the react-build stage to Nginx directory
COPY --from=react-build /g4-tastybytes/dist /usr/share/nginx/html

# Run uvicorn and nginx
CMD ["/bin/sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port 8000 & nginx -g 'daemon off;'"]