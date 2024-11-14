import { Module } from '@nestjs/common';
import { FlowExecutionRepositoryImpl } from './application/flow-execution.repository.impl';
import { FlowExecutionService } from './application/flow-execution.service';
import { StepExecutionModule } from '../step-execution/step-execution.module';

@Module({
  providers: [
    FlowExecutionService,
    {
      provide: 'FlowExecutionRepository',
      useClass: FlowExecutionRepositoryImpl,
    },
  ],
  exports: [FlowExecutionService],
  imports: [StepExecutionModule],
})
export class FlowExecutionModule {}
