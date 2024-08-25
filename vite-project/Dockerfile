# Dockerfile для фронтенда
FROM node:18

WORKDIR /app

# Install dependencies
COPY package*.json ./

RUN npm install

# Copy the source code
COPY . .

# Expose port
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]