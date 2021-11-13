FROM node:17.1-alpine3.12

WORKDIR ./dockerlearn

COPY package*.json ./

RUN npm set unsafe-perm true

RUN npm install

COPY . .

# EXPOSE 3000

CMD ["npm", "start"]
