import { Module } from '@nestjs/common';
import { TriggerController } from './infrastructure/trigger.controller';
import { RunTriggerService } from './application/services/run-trigger.service';
import { TriggerRepositoryImpl } from './infrastructure/repositories/trigger.repository.impl';
import { TriggerExecutionModule } from '../trigger-execution/trigger-execution.module';
import { FlowModule } from '../flow/flow.module';
import { CreateTriggerService } from './application/services/create-trigger.service';
import { UpdateTriggerService } from './application/services/update-trigger.service';
import { GetTriggerService } from './application/services/get-trigger.service';

@Module({
  imports: [TriggerExecutionModule, FlowModule],
  controllers: [TriggerController],
  providers: [
    RunTriggerService,
    {
      provide: 'TriggerRepository',
      useClass: TriggerRepositoryImpl,
    },
    CreateTriggerService,
    UpdateTriggerService,
    GetTriggerService,
  ],
})
export class TriggerModule {}
