FROM node:18.15.0-alpine3.17

WORKDIR /app-desktop

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]