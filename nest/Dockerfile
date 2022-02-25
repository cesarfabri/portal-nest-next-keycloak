FROM node:16.13.2-alpine3.14

RUN apk add --no-cache bash

RUN npm install -g @nestjs/cli@8.0.0

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# criando o diretorio e dando privilegio ao usuario node
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

ADD package*.json ./

USER node

# RUN npm install --force

COPY --chown=node:node . .

EXPOSE 3006

CMD [ "npm", "run","start:dev" ]
