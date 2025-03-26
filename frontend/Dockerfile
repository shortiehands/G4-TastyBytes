# Stage 1: Build the React app
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /g4-tastybytes/frontend

# Copy package.json and package-lock.json from the current directory (frontend)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the app using a lightweight web server
FROM nginx:alpine

# Copy the build folder from the previous stage to the nginx html folder
COPY --from=build /g4-tastybytes/frontend/build /usr/share/nginx/html

# Expose the default nginx port
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]