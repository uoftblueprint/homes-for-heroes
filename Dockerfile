FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN npm run install:all
RUN npm install pm2 -g
RUN npm run build

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source

CMD pm2-runtime ecosystem.config.js