FROM node:14
WORKDIR /app
COPY package*.json ./
RUN yarn 
COPY . .
EXPOSE 8082
CMD ["node", "app.js"]