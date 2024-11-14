import { Inject, Injectable } from '@nestjs/common';
import { RunBlockService } from 'src/modules/block/application/run-block.service';
import { StepExecutionRepository } from '../domain/step-execution.repository';
import StepExecution from '../domain/step-execution.entity';
import ExecutionStatus from 'src/shared/enums/execution-status.enum';

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
        await this.#finish(stepExecution, ExecutionStatus.FAILURE, 'No block');
        return stepExecution;
      }
      await this.runBlockService.run(stepExecution.step.block);
      await this.#finish(stepExecution);
      return stepExecution;
    } catch (error) {
      console.error(error);
      await this.#finish(stepExecution, ExecutionStatus.FAILURE, error.message);
      return stepExecution;
    }
  }

  async #start(stepExecution: StepExecution) {
    stepExecution.status = ExecutionStatus.RUNNING;
    await this.stepExecutionRepository.save(stepExecution);
  }

  async #finish(
    step: StepExecution,
    status: ExecutionStatus = ExecutionStatus.SUCCESS,
    errorMessage?: string | null,
  ) {
    step.status = status;
    step.errorMessage = errorMessage;
    await this.stepExecutionRepository.save(step);
  }
}
