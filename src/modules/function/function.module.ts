import { Module } from '@nestjs/common';
import { RunFunctionService } from './application/run-function.service';
import { ClientModule } from '../client/client.module';
import { FlowIntegrationModule } from '../flow-integration/flow-integration.module';

@Module({
  imports: [FlowIntegrationModule, ClientModule],
  providers: [RunFunctionService],
  exports: [RunFunctionService],
})
export class FunctionModule {}
