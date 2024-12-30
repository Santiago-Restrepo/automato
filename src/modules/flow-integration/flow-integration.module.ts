import { Module } from '@nestjs/common';
import { FlowIntegrationRepositoryImpl } from './infrastructure/repositories/flow-integration.repository.impl';
import { CreateFlowIntegrationService } from './application/services/create-flow-integration.service';
import { UpdateFlowIntegrationService } from './application/services/update-flow-integration.service';
import { DeleteFlowIntegrationService } from './application/services/delete-flow-integration.service';
import { FlowIntegrationController } from './infrastructure/flow-integration.controller';
import { GetFlowIntegrationService } from './application/services/get-flow-integrations.service';

@Module({
  providers: [
    {
      provide: 'FlowIntegrationRepository',
      useClass: FlowIntegrationRepositoryImpl,
    },
    GetFlowIntegrationService,
    CreateFlowIntegrationService,
    UpdateFlowIntegrationService,
    DeleteFlowIntegrationService,
  ],
  exports: [GetFlowIntegrationService],
  controllers: [FlowIntegrationController],
})
export class FlowIntegrationModule {}
