FROM node:12.13-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ .

RUN npm run build

CMD ["npm","run","start"]
