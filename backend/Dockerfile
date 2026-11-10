FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Environment
ENV NODE_ENV=production
ENV PORT=5000

# Application port
EXPOSE 5000

# Start backend server
CMD ["node", "server.js"]
