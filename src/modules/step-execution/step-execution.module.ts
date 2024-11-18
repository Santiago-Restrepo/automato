import { Module } from '@nestjs/common';
import { RunStepExecutionService } from './application/run-step-execution.service';
import { StepExecutionRepositoryImpl } from './application/step-execution.repository.impl';
import { StepExecutionService } from './application/step-execution.service';
import { FunctionExecutionModule } from '../function-execution/function-execution.module';

@Module({
  imports: [FunctionExecutionModule],
  providers: [
    RunStepExecutionService,
    StepExecutionService,
    {
      provide: 'StepExecutionRepository',
      useClass: StepExecutionRepositoryImpl,
    },
  ],
  exports: [
    StepExecutionService,
    RunStepExecutionService,
    'StepExecutionRepository',
  ],
})
export class StepExecutionModule {}
