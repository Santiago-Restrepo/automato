FROM node:lts AS base
RUN npm install -g pnpm

FROM base AS installer
WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY . .
# COPY .git/refs/heads ./git-refs-heads

RUN pnpm install
RUN pnpm build

CMD ["pnpm", "run", "start:prod"]