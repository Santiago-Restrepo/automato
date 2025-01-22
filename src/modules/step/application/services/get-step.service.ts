import { Inject, Injectable } from '@nestjs/common';
import { StepRepository } from '../../domain/ports/step.repository';
import { Step } from '../../domain/entities/step.entity';

@Injectable()
export class GetStepService {
  constructor(
    @Inject('StepRepository')
    private readonly stepRepository: StepRepository,
  ) {}

  async getByFlowId(flowId: string): Promise<Step[]> {
    return this.stepRepository.findByFlowId(flowId);
  }
}
