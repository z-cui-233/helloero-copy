FROM node:16.13.1-buster-slim
ARG ARG_NPM_PULL_TOKEN
ENV NPM_PULL_TOKEN=${ARG_NPM_PULL_TOKEN}
WORKDIR /app
COPY ./package*.json ./
COPY ./.npmrc ./.npmrc
COPY ./packages ./packages
RUN npm install
EXPOSE 3000
CMD npm run dev -workspace helloero
