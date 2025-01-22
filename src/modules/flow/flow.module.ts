import { Module } from '@nestjs/common';
import { RunFlowService } from './application/services/run-flow.service';
import { StepModule } from '../step/step.module';
import { FlowRepositoryImpl } from './infrastructure/repositories/flow.repository.impl';
import { FlowController } from './infrastructure/flow.controller';
import { FlowExecutionModule } from '../flow-execution/flow-execution.module';
import { StepExecutionModule } from '../step-execution/step-execution.module';
import { ExecutionModule } from '../execution/execution.module';
import { GetFlowService } from './application/services/get-flow.service';
import { CreateFlowService } from './application/services/create-flow.service';
import { UpdateFlowService } from './application/services/update-flow.service';
import { FlowIntegrationModule } from '../flow-integration/flow-integration.module';
import { EncryptionModule } from '../encryption/encryption.module';

@Module({
  imports: [
    StepModule,
    FlowExecutionModule,
    StepExecutionModule,
    ExecutionModule,
    FlowIntegrationModule,
  ],
  providers: [
    RunFlowService,
    GetFlowService,
    {
      provide: 'FlowRepository',
      useClass: FlowRepositoryImpl,
    },
    CreateFlowService,
    UpdateFlowService,
  ],
  controllers: [FlowController],
  exports: [RunFlowService],
})
export class FlowModule {}
