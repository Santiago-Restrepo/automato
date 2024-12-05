import { Injectable } from '@nestjs/common';
import functions, { StepFunctions } from './functions';
import Step from 'src/modules/step/domain/step.entity';
import Execution from 'src/modules/execution/domain/execution.entity';

@Injectable()
export class RunFunctionService {
  functions: StepFunctions;
  constructor() {
    this.functions = functions;
  }

  async run(stepExecution: Execution<Step>) {
    const { referenceStep: step } = stepExecution;
    if (!step) throw new Error('Step not found in step execution');

    const stepFunction = this.#getStepFunction(step);

    return stepFunction(stepExecution.input);
  }

  #getStepFunction(step: Step) {
    const { functionName: functionName } = step;

    return this.functions[functionName];
  }
}
