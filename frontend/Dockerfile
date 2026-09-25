FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

EXPOSE 4200

# --host 0.0.0.0 : accessible depuis ton navigateur Windows
# --poll 2000    : même problème que nodemon, Windows ne signale pas les modifs
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]