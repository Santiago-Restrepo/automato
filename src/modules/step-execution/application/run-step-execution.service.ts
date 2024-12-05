import { Inject, Injectable } from '@nestjs/common';
import ExecutionStatus from 'src/modules/execution/domain/enums/execution-status.enum';
import Execution from 'src/modules/execution/domain/execution.entity';
import { ExecutionRepository } from 'src/modules/execution/domain/execution.repository';
import { RunFunctionService } from 'src/modules/function-execution/application/run-function.service';
import { ParameterService } from 'src/modules/parameter/application/parameter.service';
import Step from 'src/modules/step/domain/step.entity';
import { ParameterValue } from 'src/shared/types/parameter-value.type';

@Injectable()
export class RunStepExecutionService {
  constructor(
    @Inject('ExecutionRepository')
    private readonly stepExecutionRepository: ExecutionRepository,
    private readonly runFunctionService: RunFunctionService,
    private readonly parameterService: ParameterService,
  ) {}

  async run(stepExecution: Execution<Step>) {
    try {
      await this.#start(stepExecution);
      if (!stepExecution.referenceStep) {
        await this.#finish({
          stepExecution,
          status: ExecutionStatus.FAILURE,
          errorMessage: 'Step not found',
        });
        return stepExecution;
      }
      const result = await this.runFunctionService.run(stepExecution);

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

  async #start(stepExecution: Execution<Step>) {
    stepExecution.status = ExecutionStatus.RUNNING;
    const { parentExecution: flowExecution, referenceStep: step } =
      stepExecution;
    const stepInput = await this.parameterService.getStepInputFromParameters(
      step,
      flowExecution,
    );
    stepExecution.input = stepInput;

    await this.stepExecutionRepository.save(stepExecution);
  }

  async #finish(values: {
    stepExecution: Execution<Step>;
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
