# Base image
FROM node:18 as development

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Execute command
RUN yarn install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN yarn build

# Base image
FROM node:18 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Execute command
RUN yarn install --only=production

# Bundle app source
COPY . .

# Asset with highest premission
USER root

# Creates a "dist" folder with the production build
RUN yarn build

COPY --from=development /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "yarn", "dist/apps/spaces/main.js" ]