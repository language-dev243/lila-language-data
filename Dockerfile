# stage 1: base image
FROM node:current-alpine3.20 AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# stage 2: code quality checks
FROM base AS quality
RUN npm run lint \
    && npm run format \
    && npm run build

# stage 3: development
FROM base AS development
ENV NODE_ENV=development
CMD ["npx", "tsx", "src/server.ts"]

# stage 3: production
FROM base AS production
ENV NODE_ENV=production
RUN npm run build
CMD ["node", "dist/server.js"]

# stage 5: testing
FROM base AS testing
ENV NODE_ENV=test
CMD ["npm", "test"]
