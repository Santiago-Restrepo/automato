import { Inject, Injectable } from '@nestjs/common';
import { StepRepository } from '../../domain/ports/step.repository';

@Injectable()
export class DeleteStepService {
  constructor(
    @Inject('StepRepository')
    private readonly stepRepository: StepRepository,
  ) {}

  async delete(id: number): Promise<void> {
    return this.stepRepository.delete(id);
  }
}
