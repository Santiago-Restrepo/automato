import { Module } from '@nestjs/common';
import { RunStepExecutionService } from './application/run-step-execution.service';
import { ExecutionModule } from '../execution/execution.module';
import { StepParameterModule } from '../step-parameter/step-parameter.module';
import { FunctionModule } from '../function/function.module';

@Module({
  imports: [FunctionModule, ExecutionModule, StepParameterModule],
  providers: [RunStepExecutionService],
  exports: [RunStepExecutionService],
})
export class StepExecutionModule {}
