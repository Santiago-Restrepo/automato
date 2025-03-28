import { Inject, Injectable } from '@nestjs/common';
import { StepRepository } from '../../domain/ports/step.repository';
import { Step } from '../../domain/entities/step.entity';

@Injectable()
export class UpdateStepService {
  constructor(
    @Inject('StepRepository')
    private readonly stepRepository: StepRepository,
  ) {}

  async updateFlowSteps(flowId: string, steps: Step[]): Promise<Step[]> {
    return this.stepRepository.updateFlowSteps(flowId, steps);
  }
}
