import { Inject, Injectable } from '@nestjs/common';
import { ParameterRepository } from '../domain/parameter.repository';
import Step from 'src/modules/step/domain/step.entity';
import Execution from 'src/modules/execution/domain/execution.entity';
import { Parameter } from '../domain/parameter.entity';
import Flow from 'src/modules/flow/domain/flow.entity';

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
}
