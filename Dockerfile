FROM node:16
WORKDIR /home/node/app
COPY factory-ui /home/node/app

RUN npm install

#RUN npm run build

CMD npm run serve
EXPOSE 8080