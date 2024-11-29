import { Module } from '@nestjs/common';
import { StepRepositoryImpl } from './application/step.repository.impl';

@Module({
  providers: [
    {
      provide: 'StepRepository',
      useClass: StepRepositoryImpl,
    },
  ],
})
export class StepModule {}
