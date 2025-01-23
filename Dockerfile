FROM node:18-alpine AS base
RUN npm install -g pnpm

FROM base AS installer
WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY . .

RUN pnpm install
RUN pnpm build

EXPOSE 3010
CMD ["pnpm", "run", "start"]