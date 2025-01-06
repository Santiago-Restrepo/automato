import { Inject, Injectable } from '@nestjs/common';
import { StepParameterRepository } from '../domain/ports/step-parameter.repository';
import { StepParameter } from '../domain/entities/step-parameter.entity';

@Injectable()
export class GetStepParameterService {
  constructor(
    @Inject('StepParameterRepository')
    private readonly stepParameterRepository: StepParameterRepository,
  ) {}

  async getByStep(stepId: string): Promise<StepParameter[]> {
    return this.stepParameterRepository.getByStep(stepId);
  }
}
