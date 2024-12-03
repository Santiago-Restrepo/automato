import { Module } from '@nestjs/common';
import { FlowExecutionService } from './application/flow-execution.service';
import { ExecutionModule } from '../execution/execution.module';

@Module({
  providers: [FlowExecutionService],
  exports: [FlowExecutionService],
  imports: [ExecutionModule],
})
export class FlowExecutionModule {}
