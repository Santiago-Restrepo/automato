import { Module } from '@nestjs/common';
import typeormModule from './typeorm.module';

@Module({
  imports: [typeormModule],
})
export class PersistenceModule {}
