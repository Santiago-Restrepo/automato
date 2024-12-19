import { Module } from '@nestjs/common';
import { FlowIntegrationRepositoryImpl } from './infrastructure/repositories/flow-integration.repository.impl';
import { FlowIntegrationService } from './application/flow-integration.service';

@Module({
  providers: [
    {
      provide: 'FlowIntegrationRepository',
      useClass: FlowIntegrationRepositoryImpl,
    },
    FlowIntegrationService,
  ],
  exports: [FlowIntegrationService],
})
export class IntegrationModule {}
