import { Inject, Injectable } from '@nestjs/common';
import { TriggerExecution } from '../domain/trigger-execution.entity';
import ExecutionStatus from 'src/shared/enums/execution-status.enum';
import { TriggerExecutionRepository } from '../domain/trigger-execution.repository';
import { RunFlowService } from 'src/modules/flow/application/run-flow.service';
import { ParameterValue } from 'src/shared/types/parameter-value.type';
import { Trigger } from 'src/modules/trigger/domain/trigger.entity';

@Injectable()
export class RunTriggerExecutionService {
  constructor(
    @Inject('TriggerExecutionRepository')
    private readonly triggerExecutionRepository: TriggerExecutionRepository,
    private readonly runFlowService: RunFlowService,
  ) {}

  async run(trigger: Trigger, payload?: ParameterValue) {
    const triggerExecution = await this.#start(trigger, payload);
    try {
      await this.#finish({
        triggerExecution,
      });
      return this.runFlowService.run(trigger.flowId, triggerExecution);
    } catch (error) {
      await this.#finish({
        triggerExecution,
        status: ExecutionStatus.FAILURE,
        errorMessage: error.message,
      });
    }
  }

  async #start(trigger: Trigger, payload?: ParameterValue) {
    const triggerExecution = this.triggerExecutionRepository.create({
      triggerId: trigger.id,
      payload,
    });

    const savedTriggerExecution =
      await this.triggerExecutionRepository.save(triggerExecution);

    return savedTriggerExecution;
  }

  async #finish(values: {
    triggerExecution: TriggerExecution;
    status?: ExecutionStatus;
    errorMessage?: string | null;
  }) {
    const { triggerExecution, status, errorMessage } = values;
    triggerExecution.finishedAt = new Date();
    triggerExecution.status = status ?? ExecutionStatus.SUCCESS;
    triggerExecution.errorMessage = errorMessage;
    await this.triggerExecutionRepository.save(triggerExecution);
  }
}
