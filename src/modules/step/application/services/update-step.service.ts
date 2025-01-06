import { Inject, Injectable } from '@nestjs/common';
import { StepRepository } from '../../domain/ports/step.repository';
import { Step } from '../../domain/entities/step.entity';
import { UpdateStepDto } from '../dtos/update-step.dto';

@Injectable()
export class UpdateStepService {
  constructor(
    @Inject('StepRepository')
    private readonly stepRepository: StepRepository,
  ) {}

  async update(id: string, step: UpdateStepDto): Promise<Step> {
    return this.stepRepository.update(id, step);
  }
}
