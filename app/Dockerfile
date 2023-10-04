FROM node:14-alpine

RUN apk add curl
RUN apk add --no-cache git
WORKDIR /app

ARG APP_PREFIX
ARG API_URL

ENV APP_PREFIX $APP_PREFIX
ENV API_URL $API_URL

RUN npm config set unsafe-perm true
RUN npm install -g npm@latest

# Copy package.json and package-lock.json, so that these layer will be cached if no change of package.json
COPY package*.json ./
RUN npm install -f

# Copying source files
COPY . .

# Building app
RUN ./node_modules/.bin/next build

EXPOSE 3000

CMD npm run start
