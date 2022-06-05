FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Split the installs to utilize layered caching for build speed
COPY ./package*.json ./
RUN npm install pm2 -g

COPY ./Frontend/package*.json ./Frontend/
RUN npm run install:frontend

COPY ./Backend/package*.json ./Backend/
RUN npm run install:backend

# Cache the frontend build if no files were changed
COPY ./Frontend ./Frontend
RUN npm run build

COPY ./Backend ./Backend
COPY ./ecosystem.config.js ./
CMD pm2-runtime ecosystem.config.js