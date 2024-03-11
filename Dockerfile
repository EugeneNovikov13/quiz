FROM node:18

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/client
RUN npm i
RUN npm run build

WORKDIR /usr/src/app/server
RUN npm i

EXPOSE 3001

#TODO ????
CMD ["node", "build/app.js"]
