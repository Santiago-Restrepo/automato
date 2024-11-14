import { Module } from '@nestjs/common';
import { RunFlowService } from './application/run-flow.service';
import { StepModule } from '../step/step.module';
import { VariableModule } from '../variable/variable.module';
import { FlowRepositoryImpl } from './application/flow.repository.impl';
import { FlowController } from './infrastructure/flow.controller';
import { FlowExecutionModule } from '../flow-execution/flow-execution.module';
import { StepExecutionModule } from '../step-execution/step-execution.module';

@Module({
  imports: [
    StepModule,
    VariableModule,
    FlowExecutionModule,
    StepExecutionModule,
  ],
  providers: [
    RunFlowService,
    {
      provide: 'FlowRepository',
      useClass: FlowRepositoryImpl,
    },
  ],
  controllers: [FlowController],
})
export class FlowModule {}
