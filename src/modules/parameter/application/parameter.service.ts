import { Inject, Injectable } from '@nestjs/common';
import { ParameterRepository } from '../domain/parameter.repository';
import Step from 'src/modules/step/domain/step.entity';
import Execution from 'src/modules/execution/domain/execution.entity';
import { Parameter } from '../domain/parameter.entity';
import Flow from 'src/modules/flow/domain/flow.entity';
import { ParameterValue } from 'src/shared/types/parameter-value.type';

@Injectable()
export class ParameterService {
  constructor(
    @Inject('ParameterRepository')
    private readonly parameterRepository: ParameterRepository,
  ) {}

  getStepParameters(
    step: Step,
    flowExecution: Execution<Flow>,
  ): Promise<Parameter[]> {
    return this.parameterRepository.getStepParameters(step, flowExecution);
  }

  async getStepInputFromParameters(
    step: Step,
    flowExecution: Execution<Flow>,
  ): Promise<ParameterValue> {
    const stepParameters = await this.getStepParameters(step, flowExecution);
    const evaluatedParams = await this.#evaluateParams(
      stepParameters,
      flowExecution.parentExecution,
    );

    return evaluatedParams;
  }

  async #evaluateParams(
    parameters: Parameter[],
    triggerExecution?: Execution<'Trigger'>,
  ): Promise<ParameterValue> {
    const objectFromParameters = this.#objectFromParameters(parameters);
    if (!triggerExecution) return objectFromParameters;
    const { referenceTrigger: trigger, input } = triggerExecution;
    return {
      ...objectFromParameters,
      [trigger.payloadKey]: input,
    };
  }

  #objectFromParameters(parameters: Parameter[]) {
    return parameters.reduce((acc, parameter) => {
      const { key, value } = parameter;

      return { ...acc, [key]: value };
    }, {});
  }
}
