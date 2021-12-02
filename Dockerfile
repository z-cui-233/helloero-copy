FROM node:16.4.0-buster-slim
WORKDIR /app
EXPOSE 3000
CMD npm install && if [ "$USE_INSPECTOR" = "1" ]; then npm run build && npm run start-profile; else npm run dev; fi
