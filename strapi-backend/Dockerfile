# Dockerfile for Strapi CMS v5
FROM node:20-alpine AS builder

# Install python3, make, g++, and native build tools for sharp & better-sqlite3
RUN apk add --no-cache python3 make g++ build-base gcc autoconf automake zlib-dev libpng-dev vips-dev

WORKDIR /opt/app

ENV SHARP_IGNORE_GLOBAL_LIBVIPS=1

COPY package*.json ./
RUN npm install

COPY . .
ENV NODE_ENV=production
RUN npm run build

# Production Image
FROM node:20-alpine AS runner

RUN apk add --no-cache vips-dev

WORKDIR /opt/app
ENV NODE_ENV=production
ENV PORT=1337

COPY --from=builder /opt/app ./

EXPOSE 1337

CMD ["npm", "run", "start"]
