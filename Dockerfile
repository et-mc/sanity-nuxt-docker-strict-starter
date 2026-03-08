FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY frontend/package.json frontend/
COPY studio/package.json studio/

RUN npm ci

COPY . .

EXPOSE 3000 3333
