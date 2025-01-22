import { Inject, Injectable } from '@nestjs/common';
import { FlowRepository } from '../../domain/ports/flow.repository';
import { FlowExecutionService } from 'src/modules/flow-execution/application/flow-execution.service';
import ExecutionStatus from 'src/modules/execution/domain/enums/execution-status.enum';
import { RunStepExecutionService } from 'src/modules/step-execution/application/run-step-execution.service';
import { ExecutionRepository } from 'src/modules/execution/domain/ports/execution.repository';
import { Execution } from 'src/modules/execution/domain/entities/execution.entity';
import { Flow } from '../../domain/entities/flow.entity';
import { Trigger } from 'src/modules/trigger/domain/entities/trigger.entity';

@Injectable()
export class RunFlowService {
  constructor(
    @Inject('FlowRepository')
    private readonly flowRepository: FlowRepository,
    @Inject('ExecutionRepository')
    private readonly executionRepository: ExecutionRepository,
    private readonly flowExecutionService: FlowExecutionService,
    private readonly runStepExecutionService: RunStepExecutionService,
  ) {}

  async run(id: string, triggerExecution?: Execution<Trigger>) {
    const flow = await this.flowRepository.findFlowToRun(id);
    const execution = await this.flowExecutionService.createExecution(
      flow,
      triggerExecution,
    );

    try {
      await this.flowExecutionService.startExecution(execution);
      await this.runNextStep(execution);
    } catch (error) {
      await this.flowExecutionService.finishExecution(
        execution,
        ExecutionStatus.FAILURE,
        `${error.message}, ${error.stack}`,
      );
    }
  }

  async runNextStep(flowExecution: Execution<Flow>) {
    const stepExecution = await this.executionRepository.findOne({
      parentExecutionId: flowExecution.id,
      status: ExecutionStatus.PENDING,
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

    return this.runNextStep(flowExecution);
  }
}
