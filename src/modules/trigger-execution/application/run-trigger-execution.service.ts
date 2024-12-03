import { Inject, Injectable } from '@nestjs/common';
import ExecutionStatus from 'src/modules/execution/domain/enums/execution-status.enum';
import { RunFlowService } from 'src/modules/flow/application/run-flow.service';
import { ParameterValue } from 'src/shared/types/parameter-value.type';
import { Trigger } from 'src/modules/trigger/domain/trigger.entity';
import { ExecutionRepository } from 'src/modules/execution/domain/execution.repository';
import Execution from 'src/modules/execution/domain/execution.entity';
import ExecutionTypeEnum from 'src/modules/execution/domain/enums/execution-type.enum';

@Injectable()
export class RunTriggerExecutionService {
  constructor(
    @Inject('ExecutionRepository')
    private readonly triggerExecutionRepository: ExecutionRepository,
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

  #start(trigger: Trigger, payload?: ParameterValue) {
    return this.triggerExecutionRepository.createExecution(
      {
        referenceTriggerId: trigger.id,
        input: payload,
      },
      ExecutionTypeEnum.TRIGGER,
    );
  }

  async #finish(values: {
    triggerExecution: Execution<Trigger>;
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
