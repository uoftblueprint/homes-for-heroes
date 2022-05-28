FROM node

# Create app directory
WORKDIR /usr/src/
COPY ./Backend ./Backend
COPY ./Frontend ./Frontend


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY ./.eslintrc.json ./
COPY ./.prettierrc.json ./
COPY ecosystem.config.js ./
RUN npm run  install:all
RUN npm install pm2 -g

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source


CMD sleep 9s; npm run build ; pm2-runtime  ecosystem.config.js