import { Inject, Injectable } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { StepExecutionRepository } from '../domain/step-execution.repository';
import StepExecution from '../domain/step-execution.entity';

@Injectable()
export class StepExecutionService {
  constructor(
    @Inject('StepExecutionRepository')
    private readonly stepExecutionRepository: StepExecutionRepository,
  ) {}

  async findOne(findOneOptions?: FindOneOptions<StepExecution>) {
    return this.stepExecutionRepository.findOne({
      ...findOneOptions,
      relations: {
        flowExecution: true,
        step: {
          block: {
            step: true,
            functionBlock: true,
            parameters: true,
          },
        },
      },
    });
  }
}
