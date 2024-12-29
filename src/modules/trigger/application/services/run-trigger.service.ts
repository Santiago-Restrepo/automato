import { Inject, Injectable } from '@nestjs/common';
import { ParameterValue } from 'src/shared/types/parameter-value.type';
import { RunTriggerExecutionService } from 'src/modules/trigger-execution/application/run-trigger-execution.service';
import { TriggerRepository } from '../../domain/ports/trigger.repository';

@Injectable()
export class RunTriggerService {
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
