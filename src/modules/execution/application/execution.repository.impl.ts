import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import ExecutionStatus from 'src/modules/execution/domain/enums/execution-status.enum';
import Execution from '../domain/execution.entity';
import { ExecutionRepository } from '../domain/execution.repository';
import ExecutionTypeEnum from '../domain/enums/execution-type.enum';
import { ParameterValue } from 'src/shared/types/parameter-value.type';

@Injectable()
export class ExecutionRepositoryImpl
  extends Repository<Execution<any>>
  implements ExecutionRepository
{
  constructor(private datasource: DataSource) {
    super(Execution, datasource.createEntityManager());
  }

  async createExecution<
    T extends Partial<Execution<any>> | Partial<Execution<any>>[],
  >(
    executionDto: T,
    type: ExecutionTypeEnum,
  ): Promise<T extends any[] ? Execution<any>[] : Execution<any>> {
    if (Array.isArray(executionDto)) {
      const executions = executionDto.map((execution) => ({
        ...execution,
        type,
      }));
      return this.save(executions) as any;
    } else {
      const createdExecution = {
        ...executionDto,
        type,
      };
      return this.save(createdExecution) as any;
    }
  }

  startExecution(execution: Execution<any>): Promise<Execution<any>> {
    execution.status = ExecutionStatus.RUNNING;
    return this.save(execution);
  }

  async finishExecution(values: {
    execution: Execution<any>;
    output?: ParameterValue;
    status?: ExecutionStatus;
    errorMessage?: string | null;
  }) {
    const {
      execution: stepExecution,
      output: result,
      status,
      errorMessage,
    } = values;
    stepExecution.finishedAt = new Date();
    stepExecution.status = status ?? ExecutionStatus.SUCCESS;
    stepExecution.errorMessage = errorMessage;
    stepExecution.output = result;
    return this.save(stepExecution);
  }
}
