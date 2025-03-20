import { Environment } from 'src/shared/enums/environment';

export interface ServerConfig {
  port: number;
  env: Environment;
}

export interface DatabaseConfig {
  postgres: {
    name: string;
    host: string;
    port: number;
    username: string;
    password: string;
  };
  redis: {
    db: number;
    host: string;
    port: number;
    password?: string;
    prefix?: string;
  };
}

export interface Config {
  server: ServerConfig;
  database: DatabaseConfig;
  encryption: {
    key: string;
  };
  auth: {
    secret: string;
  };
}

export default (): Config => {
  return {
    server: {
      port: (process.env.PORT || 3000) as number,
      env: process.env.ENV as Environment,
    },
    database: {
      postgres: {
        name: process.env.POSTGRES_DB as string,
        host: process.env.POSTGRES_HOST as string,
        port: (process.env.POSTGRES_PORT || 5432) as number,
        username: process.env.POSTGRES_USER as string,
        password: process.env.POSTGRES_PASSWORD as string,
      },
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
        db: Number(process.env.REDIS_DB) || 0,
        password: process.env.REDIS_PASSWORD || undefined,
        prefix: process.env.REDIS_PREFIX,
      },
    },
    encryption: {
      key: process.env.ENCRYPTION_KEY as string,
    },
    auth: {
      secret: process.env.JWT_SECRET as string,
    },
  };
};
