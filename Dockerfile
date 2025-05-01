FROM node:22-alpine3.21

WORKDIR /app

ADD . .

RUN npm i --only=prod
RUN npm run build

CMD node dist/main
