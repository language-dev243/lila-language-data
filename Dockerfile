# base image
FROM node:current-alpine3.20 AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# code quality checks
FROM base AS quality
RUN npm run lint \
    && npm run format \
    && npm run build

# development
FROM base AS development
ENV NODE_ENV=development
CMD ["npx", "tsx", "src/server.ts"]

# production
FROM base AS production
ENV NODE_ENV=production
RUN npm run build
CMD ["node", "dist/server.js"]

# testing
FROM base AS testing
ENV NODE_ENV=testing
CMD ["npm", "test"]

FROM libretranslate/libretranslate AS libretranslate-base
CMD ["libretranslate", "--update-models", "--load-only en,es,fr,it,de"]
