# Use an official Node.js runtime as a parent image (choose a version compatible with your project)
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install app dependencies
# Use a clean install to ensure you get exactly what's in the lock file
RUN npm ci

# Bundle app source
COPY . .

# Build the application
RUN npm run build

# --- Production Stage ---
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy only necessary files from the builder stage
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD [ "node", "dist/main" ]
