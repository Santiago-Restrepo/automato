import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';

@Injectable()
export class QueueService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async enqueueFlow(flowId: string, payload: any): Promise<void> {
    const data = JSON.stringify(payload);
    await this.redis.xadd('flowQueue', '*', 'flowId', flowId, 'payload', data);
    Logger.verbose(`✅ Flow ${flowId} added to the queue.`);
  }
}
