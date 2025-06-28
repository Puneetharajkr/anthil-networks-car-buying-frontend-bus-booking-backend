# Use a lightweight Node.js image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy entire source code
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
