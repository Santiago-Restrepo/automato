import { Injectable } from '@nestjs/common';
import functions, { StepFunctions } from './functions';
import { Parameter } from 'src/modules/parameter/domain/parameter.entity';
import { ParameterService } from 'src/modules/parameter/application/parameter.service';
import Step from 'src/modules/step/domain/step.entity';
import StepExecution from 'src/modules/step-execution/domain/step-execution.entity';
import { TriggerExecution } from 'src/modules/trigger-execution/domain/trigger-execution.entity';

@Injectable()
export class RunFunctionService {
  functions: StepFunctions;
  constructor(private readonly parameterService: ParameterService) {
    this.functions = functions;
  }

  async run(stepExecution: StepExecution) {
    const { step, flowExecution } = stepExecution;
    if (!step) throw new Error('Step not found in step execution');
    const { triggerExecution } = flowExecution;
    const stepFunction = this.#getStepFunction(step);
    const stepParameters = await this.parameterService.getStepParameters(
      step,
      flowExecution,
    );
    const evaluatedParams = await this.#evaluateParams(
      stepParameters,
      triggerExecution,
    );
    return stepFunction(evaluatedParams);
  }

  #getStepFunction(step: Step) {
    const { functionName: functionName } = step;

    return this.functions[functionName];
  }

  async #evaluateParams(
    parameters: Parameter[],
    triggerExecution?: TriggerExecution,
  ) {
    const objectFromParameters = this.#objectFromParameters(parameters);
    if (!triggerExecution) return objectFromParameters;
    const { trigger, payload } = triggerExecution;
    return {
      ...objectFromParameters,
      [trigger.payloadKey]: payload,
    };
  }

  #objectFromParameters(parameters: Parameter[]) {
    return parameters.reduce((acc, parameter) => {
      const { key, value } = parameter;

      return { ...acc, [key]: value };
    }, {});
  }
}
