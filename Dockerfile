# Dev-only image (no production build), part of the DinDin npm workspace.
# Build context is the repo root (tech-challenge/) so it can reach the
# sibling design-system/ package consumed via the workspace.
FROM node:20-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./
COPY login/.npmrc ./.npmrc
COPY login ./login
COPY root/package.json ./root/package.json

ARG NPM_TOKEN
ENV NPM_TOKEN=$NPM_TOKEN

RUN npm install

WORKDIR /app/login

EXPOSE 3001

CMD ["npm", "run", "dev"]
