# LocalFind Data API - HuggingFace Spaces Docker Configuration
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy application files
COPY . .

# Change ownership to node user (UID 1000 in node:alpine)
RUN chown -R node:node /app

# Switch to node user
USER node

# Expose port 3000
EXPOSE 3000

# Start server
CMD ["npm", "start"]
