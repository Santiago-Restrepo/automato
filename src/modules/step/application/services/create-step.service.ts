import { Inject, Injectable } from '@nestjs/common';
import { StepRepository } from '../../domain/ports/step.repository';
import { Step } from '../../domain/entities/step.entity';
import { CreateStepDto } from '../dtos/create-step.dto';

@Injectable()
export class CreateStepService {
  constructor(
    @Inject('StepRepository')
    private readonly stepRepository: StepRepository,
  ) {}

  async create(createStepDto: CreateStepDto): Promise<Step> {
    return this.stepRepository.create(createStepDto);
  }
}
