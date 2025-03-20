import { Module } from '@nestjs/common';
import { QueueModule } from '../queue/queue.module';
import { FlowModule } from '../flow/flow.module';

@Module({
  imports: [QueueModule, FlowModule],
  providers: [],
})
export class WorkerModule {}
