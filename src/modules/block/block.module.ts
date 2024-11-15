import { Module } from '@nestjs/common';
import { BlockRepositoryImpl } from './application/block.repository.impl';

@Module({
  providers: [
    {
      provide: 'BlockRepository',
      useClass: BlockRepositoryImpl,
    },
  ],
})
export class BlockModule {}
