FROM node:latest
WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./
COPY prisma ./prisma

# Install dependencies (including devDependencies for build)
RUN npm install

# Copy the rest of the files
COPY . .

# Build the project
RUN npm run build

# Remove devDependencies after build
RUN npm prune --production

EXPOSE 3001
CMD ["npm", "run", "start:prod"]