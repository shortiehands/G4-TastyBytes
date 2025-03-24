# Stage 1: Build the React app
FROM node:18-alpine AS react-build

WORKDIR /g4-tastybytes-frontend

# Copy the frontend package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy all frontend files and build the React app
COPY . .
RUN npm run build && ls -l /g4-tastybytes-frontend/build

# Stage 2: Set up FastAPI backend
FROM python:3.11-slim AS fastapi-build

WORKDIR /g4-tastybytes-backend

# Copy the backend requirements
COPY requirements.txt /g4-tastybytes-backend/

# Install backend dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the FastAPI app code
COPY app /g4-tastybytes-backend/

# Stage 3: Final image combining FastAPI and React
FROM nginx:alpine

# Copy the built React files from the react-build stage
COPY --from=react-build /g4-tastybytes-frontend/build /usr/share/nginx/html

# Copy the FastAPI app files (if required for runtime)
COPY --from=fastapi-build /g4-tastybytes-backend /g4-tastybytes-backend

# Expose necessary ports
# For React (served by Nginx)
EXPOSE 80
# For FastAPI
EXPOSE 8000

# Run both FastAPI and Nginx to serve the frontend
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port 8000 & nginx -g 'daemon off;'"]