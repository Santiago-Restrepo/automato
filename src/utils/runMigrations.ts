import { Logger } from '@nestjs/common';
import dataSource from '../config/data-source';

export const runMigrations = async () => {
  const database = dataSource;
  if (!database.isInitialized) {
    await database.initialize();
  }
  Logger.log('Running migrations...');
  const migrationsRunned = await database.runMigrations();
  const migrationsLog =
    migrationsRunned?.map((migration) => migration.name).join(', ') ||
    'no migrations';
  Logger.log(`migrations runned: ${migrationsLog}`);
};
