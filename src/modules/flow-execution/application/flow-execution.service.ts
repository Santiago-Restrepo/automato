import { Inject, Injectable } from '@nestjs/common';
import { FlowExecutionRepository } from '../domain/flow-execution.repository';
import Flow from 'src/modules/flow/domain/flow.entity';
import FlowExecution from '../domain/flow-execution.entity';
import { StepExecutionRepository } from 'src/modules/step-execution/domain/step-execution.repository';
import { FindOptionsWhere } from 'typeorm';
import ExecutionStatus from 'src/shared/enums/execution-status.enum';
import { TriggerExecution } from 'src/modules/trigger-execution/domain/trigger-execution.entity';

@Injectable()
export class FlowExecutionService {
  constructor(
    @Inject('FlowExecutionRepository')
    private readonly flowExecutionRepository: FlowExecutionRepository,
    @Inject('StepExecutionRepository')
    private readonly stepExecutionRepository: StepExecutionRepository,
  ) {}

  async createExecution(
    flow: Flow,
    triggerExecution?: TriggerExecution,
  ): Promise<FlowExecution> {
    const execution = this.flowExecutionRepository.create({
      flowId: flow.id,
      triggerExecutionId: triggerExecution?.id,
    });

    const executionSaved = await this.flowExecutionRepository.save(execution);
    const stepExecutions = flow.steps?.map((step) => {
      return this.stepExecutionRepository.create({
        stepId: step.id,
        flowExecutionId: executionSaved.id,
      });
    });

    await this.stepExecutionRepository.save(stepExecutions);

    return executionSaved;
  }

  async startExecution(flowExecution: FlowExecution): Promise<FlowExecution> {
    return this.flowExecutionRepository.startExecution(flowExecution);
  }

  async finishExecution(
    flowExecution: FlowExecution,
    status: ExecutionStatus = ExecutionStatus.SUCCESS,
    errorMessage?: string | null,
  ) {
    flowExecution.status = status;
    flowExecution.errorMessage = errorMessage;
    await this.flowExecutionRepository.save(flowExecution);
  }

  async findOneBy(
    where: FindOptionsWhere<FlowExecution> | FindOptionsWhere<FlowExecution>[],
  ): Promise<FlowExecution | null> {
    return this.flowExecutionRepository.findOneBy(where);
  }
}
