# stage 1: base image
FROM node:current-alpine3.20 AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# stage 2: development
FROM base AS development
ENV NODE_ENV=development
CMD ["npx", "tsx", "src/server.ts"]

# stage 3: production
FROM base AS production
ENV NODE_ENV=production
RUN npm run build
CMD ["node", "dist/server.js"]
