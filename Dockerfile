FROM node:20

WORKDIR /app

COPY package*.json ./

# COPY node_modules/* ./
# RUN npm install

# COPY . .

# RUN npm run build

# CMD [ "npm", "run", "start:dev" ]