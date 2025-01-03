import { Module } from '@nestjs/common';
import { stepParameterInExecutionService } from './application/step-parameter-in-execution.service';
import { StepParameterRepositoryImpl } from './infrastructure/repositories/step-parameter.repository.impl';
import { GetStepParameterService } from './application/get-step-parameter.service';

@Module({
  providers: [
    stepParameterInExecutionService,
    {
      provide: 'StepParameterRepository',
      useClass: StepParameterRepositoryImpl,
    },
    GetStepParameterService,
  ],
  exports: [stepParameterInExecutionService, GetStepParameterService],
})
export class StepParameterModule {}
