FROM node:16.13.1-buster-slim
WORKDIR /app
EXPOSE 3000
# if we use "npm run dev -workspace helloero", feel that the server is easy to go down
CMD npm install && cd packages/helloero && npm run dev
