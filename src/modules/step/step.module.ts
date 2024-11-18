import { Module } from '@nestjs/common';
import { StepRepositoryImpl } from './application/step.repository.impl';

@Module({
  imports: [],
  providers: [
    {
      provide: 'StepRepository',
      useClass: StepRepositoryImpl,
    },
  ],
  exports: [],
})
export class StepModule {}
