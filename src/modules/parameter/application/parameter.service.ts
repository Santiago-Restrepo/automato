import { Inject, Injectable } from '@nestjs/common';
import { ParameterRepository } from '../domain/parameter.repository';
import FlowExecution from 'src/modules/flow-execution/domain/flow-execution.entity';
import Step from 'src/modules/step/domain/step.entity';

@Injectable()
export class ParameterService {
  constructor(
    @Inject('ParameterRepository')
    private readonly parameterRepository: ParameterRepository,
  ) {}

  getStepParameters(step: Step, flowExecution: FlowExecution) {
    return this.parameterRepository.getStepParameters(step, flowExecution);
  }
}
