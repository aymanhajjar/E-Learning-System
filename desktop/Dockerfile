FROM node:18.15.0-alpine3.17

RUN apt-get update
# Default jdk
RUN apt-get install -y default-jdk

WORKDIR /app-desktop

COPY package*.json ./

RUN npm install

RUN npm install -g electron

COPY . .

EXPOSE 6000

CMD [ "npx", "electron", "." ]