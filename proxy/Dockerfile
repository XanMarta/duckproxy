FROM node:14-alpine

RUN mkdir -p /app

COPY package.json index.js /app/

WORKDIR /app

RUN npm install

CMD ["node", "index.js"]