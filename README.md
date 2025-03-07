# 🤖 Automato Backend

## 📝 Overview

Automato is a backend automation platform built using NestJS with a hexagonal architecture. It separates concerns into modules based on responsibilities and uses PostgreSQL with TypeORM for data persistence.

## 📌 Prerequisites

Ensure you have the following installed:

- ⚡ **Node.js** (>=20.18.1, <=22.14.0)
- 📦 **pnpm** (>=9, <11)
- 🐘 **PostgreSQL**

## ⚙️ Environment Variables

The following environment variables are required to run the project:

```
POSTGRES_DB=<database_name>
POSTGRES_USER=<database_user>
POSTGRES_PASSWORD=<database_password>
POSTGRES_HOST=<database_host>
PORT=<port_number>
NGROK_AUTHTOKEN=<ngrok_auth_token>
ENV=<development|staging|production>
ENCRYPTION_KEY=<encryption_key>
JWT_SECRET=<jwt_secret>
```

## 🚀 Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/Santiago-Restrepo/automato.git
cd automato
pnpm install
```

## 🏃 Running the Project

### 🛠 Development Mode

```sh
pnpm start:dev
```

### 🚢 Production Mode

```sh
pnpm build
pnpm start:prod
```

### 📜 Running Migrations

Generate a migration:

```sh
pnpm migration:gen <migration-name>
```

Run pending migrations:

```sh
pnpm migration:up
```

Revert last migration:

```sh
pnpm migration:down
```

## ✅ Testing

Run unit tests:

```sh
pnpm test
```

Run tests with coverage:

```sh
pnpm test:cov
```

Run e2e tests:

```sh
pnpm test:e2e
```

## 📖 API Documentation

The API is documented using Swagger. Once the server is running, access the docs at:

```
http://localhost:3010/api/docs
```

## 📜 License

This project is licensed under the **UNLICENSED** license.
