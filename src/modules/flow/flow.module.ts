import { Module } from '@nestjs/common';
import { RunFlowService } from './application/services/run-flow.service';
import { StepModule } from '../step/step.module';
import { FlowRepositoryImpl } from './infrastructure/repositories/flow.repository.impl';
import { FlowController } from './infrastructure/flow.controller';
import { FlowExecutionModule } from '../flow-execution/flow-execution.module';
import { StepExecutionModule } from '../step-execution/step-execution.module';
import { ExecutionModule } from '../execution/execution.module';

@Module({
  imports: [
    StepModule,
    FlowExecutionModule,
    StepExecutionModule,
    ExecutionModule,
  ],
  providers: [
    RunFlowService,
    {
      provide: 'FlowRepository',
      useClass: FlowRepositoryImpl,
    },
  ],
  controllers: [FlowController],
  exports: [RunFlowService],
})
export class FlowModule {}
