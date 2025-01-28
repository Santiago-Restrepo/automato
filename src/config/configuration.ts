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
    },
    encryption: {
      key: process.env.ENCRYPTION_KEY as string,
    },
    auth: {
      secret: process.env.JWT_SECRET as string,
    },
  };
};
