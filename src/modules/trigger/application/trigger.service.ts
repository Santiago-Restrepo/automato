import { Inject, Injectable } from '@nestjs/common';
import { TriggerRepository } from '../domain/trigger.repository';
import { ParameterValue } from 'src/shared/types/parameter-value.type';
import { RunTriggerExecutionService } from 'src/modules/trigger-execution/application/run-trigger-execution.service';

@Injectable()
export class TriggerService {
  constructor(
    @Inject('TriggerRepository')
    private readonly triggerRepository: TriggerRepository,
    private readonly runTriggerExecutionService: RunTriggerExecutionService,
  ) {}

  async run(id: number, payload?: ParameterValue) {
    const trigger = await this.triggerRepository.findOneByOrFail({
      id,
    });

    if (!trigger.isActive) {
      throw new Error('Trigger is not active');
    }

    return this.runTriggerExecutionService.run(trigger, payload);
  }
}
