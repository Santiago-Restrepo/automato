import { Inject, Injectable } from '@nestjs/common';
import ExecutionStatus from 'src/modules/execution/domain/enums/execution-status.enum';
import {
  createExecutionDto,
  ExecutionRepository,
} from 'src/modules/execution/domain/ports/execution.repository';
import ExecutionType from 'src/modules/execution/domain/enums/execution-type.enum';
import { Flow } from 'src/modules/flow/domain/entities/flow.entity';
import { Execution } from 'src/modules/execution/domain/entities/execution.entity';
import { Trigger } from 'src/modules/trigger/domain/entities/trigger.entity';

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
    const flowExecution = await this.executionRepository.create({
      referenceFlowId: flow.id,
      parentExecutionId: triggerExecution?.id,
      type: ExecutionType.FLOW,
    });

    if (!flow.steps) throw new Error('Flow has no steps to run');

    const stepExecutionsDto = flow.steps.map((step) => {
      const stepExecution: createExecutionDto = {
        referenceStepId: step.id,
        parentExecutionId: flowExecution.id,
        type: ExecutionType.STEP,
      };
      return stepExecution;
    });

    await this.executionRepository.createMany(stepExecutionsDto);

    return flowExecution;
  }

  async startExecution(
    flowExecution: Execution<Flow>,
  ): Promise<Execution<Flow>> {
    return this.executionRepository.start(flowExecution);
  }

  async finishExecution(
    flowExecution: Execution<Flow>,
    status: ExecutionStatus = ExecutionStatus.SUCCESS,
    errorMessage?: string | null,
  ) {
    return this.executionRepository.finish({
      execution: flowExecution,
      status,
      errorMessage,
    });
  }
}
