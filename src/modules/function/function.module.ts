import { Module } from '@nestjs/common';
import { RunFunctionService } from './application/run-function.service';
import { IntegrationModule } from '../integration/integration.module';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [IntegrationModule, ClientModule],
  providers: [RunFunctionService],
  exports: [RunFunctionService],
})
export class FunctionModule {}
