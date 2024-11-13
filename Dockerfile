FROM node:22-alpine

WORKDIR /app

COPY package*.json .

RUN npm config set strict-ssl false

RUN npm i --legacy-peer-deps

COPY . .

CMD ["npm", "run", "start:dev"]