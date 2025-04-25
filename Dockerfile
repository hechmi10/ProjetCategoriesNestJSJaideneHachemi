FROM node:latest
WORKDIR /app

# First copy ONLY package files
COPY package*.json ./

# Then install dependencies
RUN npm install
RUN npm install passport-jwt

# Then copy everything else
COPY . .

# Build and cleanup
RUN npm run build && \
    npm prune --production

EXPOSE 3001
CMD ["node", "dist/main.js"]