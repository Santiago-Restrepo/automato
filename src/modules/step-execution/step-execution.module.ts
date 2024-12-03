import { Module } from '@nestjs/common';
import { RunStepExecutionService } from './application/run-step-execution.service';
import { StepExecutionService } from './application/step-execution.service';
import { FunctionExecutionModule } from '../function-execution/function-execution.module';
import { ExecutionModule } from '../execution/execution.module';

@Module({
  imports: [FunctionExecutionModule, ExecutionModule],
  providers: [RunStepExecutionService, StepExecutionService],
  exports: [StepExecutionService, RunStepExecutionService],
})
export class StepExecutionModule {}
