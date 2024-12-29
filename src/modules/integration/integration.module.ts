import { Module } from '@nestjs/common';
import { GetIntegrationService } from './application/services/get-integration.service';
import { CreateIntegrationService } from './application/services/create-integration.service';
import { DeleteIntegrationService } from './application/services/delete-integration.service';
import { IntegrationRepositoryImpl } from './infrastructure/repositories/integration.repository.impl';
import { IntegrationController } from './infrastructure/integration.controller';

@Module({
  providers: [
    {
      provide: 'IntegrationRepository',
      useClass: IntegrationRepositoryImpl,
    },
    GetIntegrationService,
    CreateIntegrationService,
    DeleteIntegrationService,
  ],
  exports: [],
  controllers: [IntegrationController],
})
export class IntegrationModule {}
