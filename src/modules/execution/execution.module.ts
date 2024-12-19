import { Module } from '@nestjs/common';
import { ExecutionRepositoryImpl } from './infrastructure/repositories/execution.repository.impl';

@Module({
  providers: [
    {
      provide: 'ExecutionRepository',
      useClass: ExecutionRepositoryImpl,
    },
  ],
  exports: ['ExecutionRepository'],
})
export class ExecutionModule {}
