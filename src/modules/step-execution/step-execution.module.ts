import { Module } from '@nestjs/common';
import { RunStepExecutionService } from './application/run-step-execution.service';
import { StepExecutionRepositoryImpl } from './application/step-execution.repository.impl';
import { BlockModule } from '../block/block.module';
import { StepExecutionService } from './application/step-execution.service';

@Module({
  providers: [
    RunStepExecutionService,
    StepExecutionService,
    {
      provide: 'StepExecutionRepository',
      useClass: StepExecutionRepositoryImpl,
    },
  ],
  imports: [BlockModule],
  exports: [
    StepExecutionService,
    RunStepExecutionService,
    'StepExecutionRepository',
  ],
})
export class StepExecutionModule {}
