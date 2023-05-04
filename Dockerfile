FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install pm2 -g

COPY . .

ENV PLACES_API_URL=${PLACES_API_URL}

EXPOSE 3000

CMD ["pm2-runtime", "npm", "--", "start"]
