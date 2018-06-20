FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 4000

# defined in package.json
CMD [ "npm", "start" ]

