# Stage 1: Build React frontend
FROM node:18-alpine AS react-build
WORKDIR /g4-tastybytes
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2: Build FastAPI backend
FROM python:3.11-slim AS fastapi-build
WORKDIR /g4-tastybytes
COPY requirements.txt /g4-tastybytes
RUN pip install --no-cache-dir -r requirements.txt
COPY . /g4-tastybytes

# Stage 3: Final container with Nginx and FastAPI
FROM nginx:alpine

# Install necessary tools (Python for FastAPI, Supervisor to manage processes)
RUN apk add --no-cache python3 py3-pip supervisor

# Copy frontend build to Nginx
COPY --from=react-build /g4-tastybytes/dist /usr/share/nginx/html

# Copy backend app
COPY --from=fastapi-build /g4-tastybytes /g4-tastybytes

# Copy Supervisor config
COPY supervisord.conf /etc/supervisord.conf

# Expose ports
EXPOSE 80 8000

# Start Supervisor to manage Nginx and FastAPI
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]