import { Module } from '@nestjs/common';
import { RunTriggerExecutionService } from './application/run-trigger-execution.service';
import { FlowModule } from '../flow/flow.module';
import { ExecutionModule } from '../execution/execution.module';

@Module({
  imports: [FlowModule, ExecutionModule],
  providers: [RunTriggerExecutionService],
  exports: [RunTriggerExecutionService],
})
export class TriggerExecutionModule {}
