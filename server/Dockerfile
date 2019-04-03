FROM node:latest

RUN mkdir /server

COPY . /server

WORKDIR /server

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]
