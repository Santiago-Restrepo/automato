import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from '../application/health-check.service';
import { Public } from 'src/shared/decorators/is-public.decorator';

@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Public()
  @Get()
  async healthCheck() {
    return this.healthCheckService.check();
  }
}
