FROM node:18
RUN apt-get update && apt-get install -y postgresql-client
RUN npm install -g nodemon
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]