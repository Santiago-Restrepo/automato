import { Inject, Injectable } from '@nestjs/common';
import { StepExecutionRepository } from '../domain/step-execution.repository';
import StepExecution from '../domain/step-execution.entity';
import ExecutionStatus from 'src/shared/enums/execution-status.enum';
import { ParameterValue } from 'src/shared/types/paramter-value.type';
import { RunBlockService } from 'src/modules/block-execution/application/run-block.service';

@Injectable()
export class RunStepExecutionService {
  constructor(
    @Inject('StepExecutionRepository')
    private readonly stepExecutionRepository: StepExecutionRepository,
    private readonly runBlockService: RunBlockService,
  ) {}

  async run(stepExecution: StepExecution) {
    try {
      await this.#start(stepExecution);
      if (!stepExecution.step?.block) {
        await this.#finish({
          stepExecution,
          status: ExecutionStatus.FAILURE,
          errorMessage: 'No block',
        });
        return stepExecution;
      }
      const result = await this.runBlockService.run(
        stepExecution.step.block,
        stepExecution.flowExecution,
      );

      await this.#finish({
        stepExecution,
        result,
      });
      return stepExecution;
    } catch (error) {
      console.error(error);
      await this.#finish({
        stepExecution,
        status: ExecutionStatus.FAILURE,
        errorMessage: error.message,
      });
      return stepExecution;
    }
  }

  async #start(stepExecution: StepExecution) {
    stepExecution.status = ExecutionStatus.RUNNING;
    await this.stepExecutionRepository.save(stepExecution);
  }

  async #finish(values: {
    stepExecution: StepExecution;
    result?: ParameterValue;
    status?: ExecutionStatus;
    errorMessage?: string | null;
  }) {
    const { stepExecution, result, status, errorMessage } = values;
    stepExecution.finishedAt = new Date();
    stepExecution.status = status ?? ExecutionStatus.SUCCESS;
    stepExecution.errorMessage = errorMessage;
    stepExecution.output = result;
    await this.stepExecutionRepository.save(stepExecution);
  }
}
