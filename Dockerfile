FROM node:20


WORKDIR /app

COPY . .

CMD ["node", "index.js"]