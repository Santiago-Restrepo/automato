import { Module } from '@nestjs/common';
import { RunFunctionService } from './application/services/run-function.service';
import { ClientModule } from '../client/client.module';
import { FlowIntegrationModule } from '../flow-integration/flow-integration.module';
import { GetFunctionService } from './application/services/get-function.service';
import { FunctionRepositoryImpl } from './infrastructure/repositories/function.repository.impl';
import { FunctionController } from './infrastructure/function.controller';

@Module({
  imports: [FlowIntegrationModule, ClientModule],
  providers: [
    RunFunctionService,
    GetFunctionService,
    {
      provide: 'FunctionRepository',
      useClass: FunctionRepositoryImpl,
    },
  ],
  exports: [RunFunctionService],
  controllers: [FunctionController],
})
export class FunctionModule {}
