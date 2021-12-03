FROM node:16.4.0-buster-slim
WORKDIR /app
EXPOSE 3000
CMD npm install && npm run dev
