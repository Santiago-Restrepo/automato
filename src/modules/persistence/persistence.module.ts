import { Module } from '@nestjs/common';
import typeormModule from './typeorm.module';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    typeormModule,
    RedisModule.forRoot({
      type: 'single',
      url: 'redis://localhost:6379',
    }),
  ],
})
export class PersistenceModule {}
