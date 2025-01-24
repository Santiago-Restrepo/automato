import { Module } from '@nestjs/common';
import { HealthCheckController } from './infrastructure/health-check.controller';

@Module({
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
