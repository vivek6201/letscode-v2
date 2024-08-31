FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn db:migrate && yarn db:generate

EXPOSE 3000

CMD [ "yarn", "dev" ]