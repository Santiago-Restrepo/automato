import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { StepParameterRepository } from '../../domain/ports/step-parameter.repository';
import ExecutionOrmEntity from 'src/modules/execution/infrastructure/entities/execution.orm-entity';
import { Step } from 'src/modules/step/domain/entities/step.entity';
import { Flow } from 'src/modules/flow/domain/entities/flow.entity';
import { StepParameter } from '../../domain/entities/step-parameter.entity';
import { StepParameterOrmEntity } from '../entities/step-parameter.orm-entity';
import { StepParameterMapper } from '../mappers/step-parameter.mapper';
import { Execution } from 'src/modules/execution/domain/entities/execution.entity';

@Injectable()
export class StepParameterRepositoryImpl implements StepParameterRepository {
  private repository: Repository<StepParameterOrmEntity>;
  constructor(private datasource: DataSource) {
    this.repository = this.datasource.getRepository(StepParameterOrmEntity);
  }

  async getByExecution(
    step: Step,
    flowExecution: Execution<Flow>,
  ): Promise<StepParameter[]> {
    const parameters = await this.repository.find({
      relations: {
        functionParameter: true,
        outputStep: true,
      },
      where: {
        inputStepId: step.id,
      },
    });
    const ormStepParameters = await Promise.all(
      parameters.map(async (parameter) => {
        const stepExecution = await this.datasource
          .getRepository(ExecutionOrmEntity<Step>)
          .findOne({
            where: {
              parentExecutionId: flowExecution.id,
              referenceStepId: parameter.outputStep?.id,
            },
          });
        return {
          ...parameter,
          value: parameter.value || stepExecution?.output,
        };
      }),
    );

    return ormStepParameters.map(StepParameterMapper.toDomain);
  }

  async getByStep(stepId: string): Promise<StepParameter[]> {
    const parameters = await this.repository.find({
      where: { inputStepId: stepId },
    });

    return parameters.map(StepParameterMapper.toDomain);
  }
}
