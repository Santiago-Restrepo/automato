import { Module } from '@nestjs/common';
import { TriggerController } from './infrastructure/trigger.controller';
import { TriggerService } from './application/trigger.service';
import { TriggerRepositoryImpl } from './application/trigger.repository.impl';
import { TriggerExecutionModule } from '../trigger-execution/trigger-execution.module';
import { FlowModule } from '../flow/flow.module';

@Module({
  imports: [TriggerExecutionModule, FlowModule],
  controllers: [TriggerController],
  providers: [
    TriggerService,
    {
      provide: 'TriggerRepository',
      useClass: TriggerRepositoryImpl,
    },
  ],
})
export class TriggerModule {}
