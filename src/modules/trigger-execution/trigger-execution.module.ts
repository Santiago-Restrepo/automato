import { Module } from '@nestjs/common';
import { TriggerExecutionRepositoryImpl } from './application/trigger-execution.repository.impl';
import { RunTriggerExecutionService } from './application/run-trigger-execution.service';
import { FlowModule } from '../flow/flow.module';

@Module({
  imports: [FlowModule],
  providers: [
    RunTriggerExecutionService,
    {
      provide: 'TriggerExecutionRepository',
      useClass: TriggerExecutionRepositoryImpl,
    },
  ],
  exports: ['TriggerExecutionRepository', RunTriggerExecutionService],
})
export class TriggerExecutionModule {}
