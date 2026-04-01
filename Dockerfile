# LocalFind Data API - HuggingFace Spaces Docker Configuration
FROM node:18-alpine

# Create user with UID 1000 (HuggingFace requirement)
RUN adduser -D -u 1000 user

# Set user and working directory
USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH

WORKDIR $HOME/app

# Copy package files with correct ownership
COPY --chown=user package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files with correct ownership
COPY --chown=user . .

# Expose port 3000 (configured in README.md as app_port)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start server
CMD ["npm", "start"]
