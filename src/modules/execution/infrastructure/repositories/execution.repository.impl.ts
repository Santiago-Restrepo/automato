import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import ExecutionStatus from 'src/modules/execution/domain/enums/execution-status.enum';
import ExecutionOrmEntity from '../entities/execution.orm-entity';
import {
  createExecutionDto,
  ExecutionRepository,
} from '../../domain/ports/execution.repository';
import { ParameterValue } from 'src/shared/types/parameter-value.type';
import { Execution } from '../../domain/entities/execution.entity';
import { ExecutionMapper } from '../mappers/execution.mapper';

@Injectable()
export class ExecutionRepositoryImpl implements ExecutionRepository {
  private repository: Repository<ExecutionOrmEntity>;

  constructor(private datasource: DataSource) {
    this.repository = this.datasource.getRepository(ExecutionOrmEntity);
  }

  async findById(id: number): Promise<Execution | null> {
    const ormEntity = await this.repository.findOne({ where: { id } });
    return ormEntity ? ExecutionMapper.toDomain(ormEntity) : null;
  }

  async findOne(
    query: Partial<Execution<any>>,
  ): Promise<Execution<any> | null> {
    const ormEntity = await this.repository.findOne({
      where: {
        ...(query as any),
      },
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
      order: {
        referenceStep: {
          order: 'ASC',
        },
      },
    });

    return ormEntity ? ExecutionMapper.toDomain(ormEntity) : null;
  }

  create(execution: createExecutionDto): Promise<Execution<any>> {
    const executionToSave = Execution.create(execution);
    return this.save(executionToSave) as Promise<Execution<any>>;
  }

  createMany(executions: createExecutionDto[]): Promise<Execution<any>[]> {
    const executionsToSave = executions.map(Execution.create);
    return this.save(executionsToSave) as Promise<Execution<any>[]>;
  }
  async save(
    execution: Execution | Execution[],
  ): Promise<Execution | Execution[]> {
    const ormEntities = Array.isArray(execution)
      ? execution.map(ExecutionMapper.toOrm)
      : [ExecutionMapper.toOrm(execution)];

    const savedEntities = await this.repository.save(ormEntities);

    return Array.isArray(execution)
      ? savedEntities.map(ExecutionMapper.toDomain)
      : ExecutionMapper.toDomain(savedEntities[0]);
  }

  async start(execution: Execution): Promise<Execution> {
    return this.save({
      ...execution,
      status: ExecutionStatus.RUNNING,
    }) as Promise<Execution>;
  }

  async finish(values: {
    execution: Execution;
    output?: ParameterValue;
    status?: ExecutionStatus;
    errorMessage?: string | null;
  }): Promise<Execution> {
    const { execution, output, status, errorMessage } = values;
    return this.save({
      ...execution,
      finishedAt: new Date(),
      status: status ?? ExecutionStatus.SUCCESS,
      errorMessage: errorMessage ?? null,
      output: output ?? null,
    }) as Promise<Execution>;
  }
}
