FROM python:alpine

WORKDIR /app
COPY . .

RUN apk update

RUN apk add --update nodejs

RUN apk add --update npm

RUN npm i -g pm2

WORKDIR /app/belchfy-fe

RUN npm install

RUN npm run build

WORKDIR /app/belchfy-be

RUN npm install

RUN npm run build

WORKDIR /app/belchfy-py

RUN pip install -r requirements.txt

EXPOSE 5000

EXPOSE 4152

EXPOSE 4173

WORKDIR /app

CMD pm2 start ecosystem.config.js --no-daemon