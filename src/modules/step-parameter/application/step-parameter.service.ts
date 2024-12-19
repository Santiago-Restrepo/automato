import { Inject, Injectable } from '@nestjs/common';
import { StepParameterRepository } from '../domain/step-parameter.repository';
import Step from 'src/modules/step/domain/step.entity';
import Execution from 'src/modules/execution/domain/execution.entity';
import { StepParameter } from '../domain/step-parameter.entity';
import Flow from 'src/modules/flow/domain/flow.entity';
import { ParameterValue } from 'src/shared/types/parameter-value.type';

@Injectable()
export class StepParameterService {
  constructor(
    @Inject('StepParameterRepository')
    private readonly stepParameterRepository: StepParameterRepository,
  ) {}

  getStepParameters(
    step: Step,
    flowExecution: Execution<Flow>,
  ): Promise<StepParameter[]> {
    return this.stepParameterRepository.getStepParameters(step, flowExecution);
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
    parameters: StepParameter[],
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

  #objectFromParameters(parameters: StepParameter[]) {
    return parameters.reduce((acc, parameter) => {
      const {
        functionParameter: { key },
        value,
      } = parameter;

      return { ...acc, [key]: value };
    }, {});
  }
}
