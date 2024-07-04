# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if using npm)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vue app using Vite
RUN npm run build

# Expose the port your app will be running on
EXPOSE 3000

# Start the app
CMD [ "npm", "run", "dev" ]