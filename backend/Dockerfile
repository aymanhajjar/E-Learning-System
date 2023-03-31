FROM node:18.15.0-alpine3.17

WORKDIR /app-backend

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 8000

CMD ["nodemon"]