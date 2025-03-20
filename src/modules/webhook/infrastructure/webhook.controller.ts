import { Body, Controller, Post } from '@nestjs/common';
import { QueueService } from 'src/modules/queue/application/queue.service';
import { Public } from 'src/shared/decorators/is-public.decorator';
import { handleWebhookDto } from '../application/dtos/handle-webhook.dto';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly queueService: QueueService) {}

  @Post()
  @Public()
  async handleWebhook(@Body() body: handleWebhookDto) {
    await this.queueService.enqueueFlow(body.flowId, body.payload);
    return { message: 'Flow execution queued' };
  }
}
