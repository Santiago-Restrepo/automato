import { Module } from '@nestjs/common';
import { RunStepExecutionService } from './application/run-step-execution.service';
import { StepExecutionRepositoryImpl } from './application/step-execution.repository.impl';
import { StepExecutionService } from './application/step-execution.service';
import { BlockExecutionModule } from '../block-execution/block-execution.module';

@Module({
  imports: [BlockExecutionModule],
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
