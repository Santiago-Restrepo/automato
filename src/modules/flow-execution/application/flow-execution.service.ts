import { Inject, Injectable } from '@nestjs/common';
import Flow from 'src/modules/flow/domain/flow.entity';
import ExecutionStatus from 'src/modules/execution/domain/enums/execution-status.enum';
import { ExecutionRepository } from 'src/modules/execution/domain/execution.repository';
import Execution from 'src/modules/execution/domain/execution.entity';
import { Trigger } from 'src/modules/trigger/domain/trigger.entity';
import ExecutionTypeEnum from 'src/modules/execution/domain/enums/execution-type.enum';
import Step from 'src/modules/step/domain/step.entity';

@Injectable()
export class FlowExecutionService {
  constructor(
    @Inject('ExecutionRepository')
    private readonly executionRepository: ExecutionRepository,
  ) {}

  async createExecution(
    flow: Flow,
    triggerExecution?: Execution<Trigger>,
  ): Promise<Execution<Flow>> {
    const flowExecution = await this.executionRepository.createExecution(
      {
        referenceFlowId: flow.id,
        parentExecutionId: triggerExecution?.id,
      },
      ExecutionTypeEnum.FLOW,
    );

    const stepExecutionsDto = flow.steps?.map((step) => {
      const stepExecution: Partial<Execution<Step>> = {
        referenceStepId: step.id,
        parentExecutionId: flowExecution.id,
      };
      return stepExecution;
    });

    await this.executionRepository.createExecution(
      stepExecutionsDto,
      ExecutionTypeEnum.STEP,
    );

    return flowExecution;
  }

  async startExecution(
    flowExecution: Execution<Flow>,
  ): Promise<Execution<Flow>> {
    return this.executionRepository.startExecution(flowExecution);
  }

  async finishExecution(
    flowExecution: Execution<Flow>,
    status: ExecutionStatus = ExecutionStatus.SUCCESS,
    errorMessage?: string | null,
  ) {
    return this.executionRepository.finishExecution({
      execution: flowExecution,
      status,
      errorMessage,
    });
  }
}
