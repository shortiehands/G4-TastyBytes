# Base image for serving the React app
FROM nginx:alpine

# Set the working directory for FastAPI
WORKDIR /g4-tastybytes-backend

# Copy the pre-built React files from the workflow
COPY build /usr/share/nginx/html

# Copy the pre-built FastAPI backend files from the workflow
COPY app /g4-tastybytes-backend

# Expose necessary ports
# For React (served by Nginx)
EXPOSE 80
# For FastAPI
EXPOSE 8000

# Run both FastAPI and Nginx to serve the frontend and backend
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port 8000 & nginx -g 'daemon off;'"]