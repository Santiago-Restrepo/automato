import { Injectable } from '@nestjs/common';
import functions, { StepFunctions } from './functions';
import { Parameter } from 'src/modules/parameter/domain/parameter.entity';
import { ParameterService } from 'src/modules/parameter/application/parameter.service';
import FlowExecution from 'src/modules/flow-execution/domain/flow-execution.entity';
import Step from 'src/modules/step/domain/step.entity';

@Injectable()
export class RunFunctionService {
  functions: StepFunctions;
  constructor(private readonly parameterService: ParameterService) {
    this.functions = functions;
  }

  async run(step: Step, flowExecution: FlowExecution) {
    const stepFunction = this.#getStepFunction(step);
    const stepParameters = await this.parameterService.getStepParameters(
      step,
      flowExecution,
    );
    const evaluatedParams = await this.#evaluateParams(stepParameters);
    return stepFunction(evaluatedParams);
  }

  #getStepFunction(step: Step) {
    const { functionName: functionName } = step;

    return this.functions[functionName];
  }

  async #evaluateParams(parameters: Parameter[]) {
    const objectFromParameters = this.#objectFromParameters(parameters);
    return objectFromParameters;
  }

  #objectFromParameters(parameters: Parameter[]) {
    return parameters.reduce((acc, parameter) => {
      const { key, value } = parameter;

      return { ...acc, [key]: value };
    }, {});
  }
}
