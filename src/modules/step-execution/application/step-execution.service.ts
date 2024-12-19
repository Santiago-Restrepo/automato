import { Inject, Injectable } from '@nestjs/common';
import Execution from 'src/modules/execution/domain/execution.entity';
import { ExecutionRepository } from 'src/modules/execution/domain/execution.repository';
import Step from 'src/modules/step/domain/step.entity';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class StepExecutionService {
  constructor(
    @Inject('ExecutionRepository')
    private readonly executionRepository: ExecutionRepository,
  ) {}

  async findOne(findOneOptions?: FindOneOptions<Execution<Step>>) {
    return this.executionRepository.findOne({
      ...findOneOptions,
      relations: {
        parentExecution: {
          parentExecution: {
            referenceTrigger: true,
          },
        },
        referenceStep: {
          flow: true,
          parameters: true,
          function: true,
        },
      },
    });
  }
}
