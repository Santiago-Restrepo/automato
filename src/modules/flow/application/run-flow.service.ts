import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FlowRepository } from '../domain/flow.repository';
import { FlowExecutionService } from 'src/modules/flow-execution/application/flow-execution.service';
import ExecutionStatus from 'src/modules/execution/domain/enums/execution-status.enum';
import { RunStepExecutionService } from 'src/modules/step-execution/application/run-step-execution.service';
import { StepExecutionService } from 'src/modules/step-execution/application/step-execution.service';
import Execution from 'src/modules/execution/domain/execution.entity';
import { Trigger } from 'src/modules/trigger/domain/trigger.entity';
import Flow from '../domain/flow.entity';

@Injectable()
export class RunFlowService {
  constructor(
    @Inject('FlowRepository')
    private readonly flowRepository: FlowRepository,
    private readonly flowExecutionService: FlowExecutionService,
    private readonly stepExecutionService: StepExecutionService,
    private readonly runStepExecutionService: RunStepExecutionService,
  ) {}

  async run(id: number, triggerExecution?: Execution<Trigger>) {
    const flow = await this.#findFlowToRun(id);
    const execution = await this.flowExecutionService.createExecution(
      flow,
      triggerExecution,
    );

    try {
      await this.flowExecutionService.startExecution(execution);
      await this.#runNextStep(execution);
      return flow;
    } catch (error) {
      await this.flowExecutionService.finishExecution(
        execution,
        ExecutionStatus.FAILURE,
        error.message,
      );
    }
  }

  async #findFlowToRun(id: number) {
    const flow = await this.flowRepository.findOne({
      relations: { steps: true },
      where: {
        id,
      },
    });

    if (!flow) throw new NotFoundException(`Flow with id ${id} not found`);

    return flow;
  }

  async #runNextStep(flowExecution: Execution<Flow>) {
    const stepExecution = await this.stepExecutionService.findOne({
      where: {
        parentExecutionId: flowExecution.id,
        status: ExecutionStatus.PENDING,
      },
      order: { referenceStep: { order: 'ASC' } },
    });

    if (!stepExecution) {
      await this.flowExecutionService.finishExecution(flowExecution);
      return;
    }

    const nextStepResult =
      await this.runStepExecutionService.run(stepExecution);

    if (nextStepResult.status === ExecutionStatus.FAILURE) {
      await this.flowExecutionService.finishExecution(
        flowExecution,
        ExecutionStatus.FAILURE,
        nextStepResult.errorMessage,
      );
      return;
    }

    return this.#runNextStep(flowExecution);
  }
}
