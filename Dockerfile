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
COPY requirements.txt /g4-tastybytes/requirements.txt
RUN python3 -m venv /venv && /venv/bin/pip install --no-cache-dir -r /g4-tastybytes/requirements.txt
# Install uvicorn explicitly if it's not in the requirements.txt
RUN /venv/bin/pip install uvicorn
RUN /venv/bin/pip freeze
COPY . /g4-tastybytes

# Stage 3: Final container with Nginx and FastAPI
FROM nginx:alpine

# Install necessary tools (Python, pip, Supervisor)
RUN apk add --no-cache python3 py3-pip supervisor

# Set working directory
WORKDIR /g4-tastybytes

# Copy frontend build to Nginx
COPY --from=react-build /g4-tastybytes/dist /usr/share/nginx/html

# Copy backend app files
COPY --from=fastapi-build /g4-tastybytes /g4-tastybytes
COPY --from=fastapi-build /venv /venv

# Ensure Python uses the virtual environment
ENV PATH="/venv/bin:$PATH"

# Copy Supervisor config
COPY supervisord.conf /etc/supervisord.conf

# Expose ports
EXPOSE 80 8000

# Start Supervisor to manage Nginx and FastAPI
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]