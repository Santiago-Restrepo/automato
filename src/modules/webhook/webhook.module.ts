import { Module } from '@nestjs/common';
import { WebhookController } from './infrastructure/webhook.controller';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [QueueModule],
  controllers: [WebhookController],
})
export class WebhookModule {}
