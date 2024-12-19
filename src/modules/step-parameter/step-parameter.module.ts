import { Module } from '@nestjs/common';
import { StepParameterService } from './application/step-parameter.service';
import { StepParameterRepositoryImpl } from './infrastructure/repositories/step-parameter.repository.impl';

@Module({
  providers: [
    StepParameterService,
    {
      provide: 'StepParameterRepository',
      useClass: StepParameterRepositoryImpl,
    },
  ],
  exports: [StepParameterService],
})
export class StepParameterModule {}
