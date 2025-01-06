import { Inject, Injectable } from '@nestjs/common';
import { StepParameterRepository } from '../domain/ports/step-parameter.repository';
import { ParameterValue } from 'src/shared/types/parameter-value.type';
import { Step } from 'src/modules/step/domain/entities/step.entity';
import { FlowVersion } from 'src/modules/flow/domain/entities/flow.entity';
import { Execution } from 'src/modules/execution/domain/entities/execution.entity';
import { StepParameter } from '../domain/entities/step-parameter.entity';

@Injectable()
export class stepParameterInExecutionService {
  constructor(
    @Inject('StepParameterRepository')
    private readonly stepParameterRepository: StepParameterRepository,
  ) {}

  getStepParametersByExecution(
    step: Step,
    flowExecution: Execution<FlowVersion>,
  ): Promise<StepParameter[]> {
    return this.stepParameterRepository.getByExecution(step, flowExecution);
  }

  async getStepInputFromParameters(
    step: Step,
    flowExecution: Execution<FlowVersion>,
  ): Promise<ParameterValue> {
    const stepParameters = await this.getStepParametersByExecution(
      step,
      flowExecution,
    );
    const evaluatedParams = await this.#evaluateParams(
      stepParameters,
      flowExecution.parentExecution,
    );

    return evaluatedParams;
  }

  async #evaluateParams(
    parameters: StepParameter[],
    triggerExecution: Execution<'Trigger'> | null,
  ): Promise<ParameterValue> {
    const objectFromParameters = this.#objectFromParameters(parameters);
    if (!triggerExecution || !triggerExecution.referenceTrigger)
      return objectFromParameters;
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
