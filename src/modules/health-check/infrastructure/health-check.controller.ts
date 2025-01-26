import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from '../application/health-check.service';

@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  async healthCheck() {
    return this.healthCheckService.check();
  }
}
