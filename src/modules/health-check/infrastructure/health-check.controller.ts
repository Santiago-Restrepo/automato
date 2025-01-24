import { Controller, Get } from '@nestjs/common';

@Controller('health-check')
export class HealthCheckController {
  constructor() {}

  @Get()
  async healthCheck() {
    return {
      status: 'ok',
    };
  }
}
