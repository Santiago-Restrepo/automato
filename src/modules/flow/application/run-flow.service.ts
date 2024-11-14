import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FlowRepository } from '../domain/flow.repository';
import FlowExecution from 'src/modules/flow-execution/domain/flow-execution.entity';
import { FlowExecutionService } from 'src/modules/flow-execution/application/flow-execution.service';
import ExecutionStatus from 'src/shared/enums/execution-status.enum';
import { RunStepExecutionService } from 'src/modules/step-execution/application/run-step-execution.service';
import { StepExecutionService } from 'src/modules/step-execution/application/step-execution.service';

@Injectable()
export class RunFlowService {
  constructor(
    @Inject('FlowRepository')
    private readonly flowRepository: FlowRepository,
    private readonly flowExecutionService: FlowExecutionService,
    private readonly stepExecutionService: StepExecutionService,
    private readonly runStepExecutionService: RunStepExecutionService,
  ) {}

  async run(id: number) {
    const flow = await this.#findFlowToRun(id);
    const execution = await this.flowExecutionService.createExecution(flow);

    try {
      await this.#start(execution);
      return flow;
    } catch (error) {
      await this.#finish(execution, ExecutionStatus.FAILURE, error.message);
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

  async #start(execution: FlowExecution) {
    await this.flowExecutionService.runExecution(execution);
    return this.#runNextStep(execution);
  }

  async #runNextStep(execution: FlowExecution) {
    const nextStepExecution = await this.stepExecutionService.findOne({
      where: {
        flowExecutionId: execution.id,
        status: ExecutionStatus.PENDING,
      },
      order: { step: { order: 'ASC' } },
    });

    console.log(nextStepExecution);

    if (!nextStepExecution) {
      await this.#finish(execution);
      return;
    }

    const nextStepResult =
      await this.runStepExecutionService.run(nextStepExecution);

    if (nextStepResult.status === ExecutionStatus.FAILURE) {
      await this.#finish(
        execution,
        ExecutionStatus.FAILURE,
        nextStepResult.errorMessage,
      );
      return;
    }

    return this.#runNextStep(execution);
  }

  async #finish(
    flowExecution: FlowExecution,
    status: ExecutionStatus = ExecutionStatus.SUCCESS,
    errorMessage?: string | null,
  ) {
    return this.flowExecutionService.finishExecution(
      flowExecution,
      status,
      errorMessage,
    );
  }
}
