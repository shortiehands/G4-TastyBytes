# Stage 1: Build the React app
FROM node:18 AS build

# Accept the backend URL at build time
ARG REACT_APP_URL
ENV REACT_APP_URL=$REACT_APP_URL

# Set the working directory inside the container
WORKDIR /g4-tastybytes/frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the React app with the env variable available
RUN npm run build

# Stage 2: Serve the app using nginx
FROM nginx:alpine

# Copy custom nginx config
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy build output from previous stage
COPY --from=build /g4-tastybytes/frontend/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]