FROM node:latest
WORKDIR /Users/edgarbarrientos/sdc/header-bar-service
COPY package.json /Users/edgarbarrientos/sdc/header-bar-service
RUN npm install
COPY . /Users/edgarbarrientos/sdc/header-bar-service
CMD node server/cluster.js
EXPOSE 3001