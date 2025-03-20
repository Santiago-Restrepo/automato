import { RedisModuleOptions } from '@nestjs-modules/ioredis';
export const redisConfig = (): RedisModuleOptions => ({
  type: 'single',
  url: 'redis://localhost:6379',
});
