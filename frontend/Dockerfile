# Use a specific LTS version of the Node.js image
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build

# Start the Next.js app
CMD ["npm", "start"]
