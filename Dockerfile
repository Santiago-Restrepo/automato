FROM node:22.12.0-slim AS base
RUN npm install -g pnpm@9.14.4

FROM base AS installer
WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY . .
COPY .git/refs/heads ./git-refs-heads

RUN pnpm install
RUN pnpm build

EXPOSE 80
CMD ["pnpm", "run", "start:prod"]