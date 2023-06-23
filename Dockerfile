# Base image
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the application code
COPY . .

# Build the React app
RUN npm run build --force

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
