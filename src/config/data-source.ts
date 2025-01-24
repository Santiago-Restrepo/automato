import { DataSource } from 'typeorm';
import configuration from './configuration';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const databaseConfig = configuration().database.postgres;
const dataSource = new DataSource({
  type: 'postgres',
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.name,
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false,
  entities: ['dist/**/*.orm-entity{.ts,.js}'],
  migrations: ['dist/**/migrations/*.js'],
});

export default dataSource;
