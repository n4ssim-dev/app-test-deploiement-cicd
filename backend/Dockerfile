FROM node:22-alpine

WORKDIR /app

# Copie des package.json seuls, puis installation (étape mise en cache)
COPY package*.json ./
RUN npm install

# Le code arrive par le bind mount, pas de COPY ici
EXPOSE 3000

CMD ["npm", "run", "dev:docker"]