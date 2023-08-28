FROM node:16-slim

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node . .

USER node

RUN npm i 

EXPOSE 1337

CMD [ "node", "index.js" ]

