# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the project for production
RUN npm run build

# Expose the port your app runs on (Webpack dev server default is 8080)
EXPOSE 8080

# Start the Webpack development server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]