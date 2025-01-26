import { Module } from '@nestjs/common';
import { HealthCheckController } from './infrastructure/health-check.controller';
import { HealthCheckService } from './application/health-check.service';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule],
  controllers: [HealthCheckController],
  providers: [HealthCheckService],
})
export class HealthCheckModule {}
