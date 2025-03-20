import { Module } from '@nestjs/common';
import { QueueService } from './application/queue.service';

@Module({
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
