import { EntityManager, FindOneOptions, FindOptionsWhere } from 'typeorm';
import Execution from './execution.entity';
import ExecutionTypeEnum from './enums/execution-type.enum';
import { ParameterValue } from 'src/shared/types/parameter-value.type';
import ExecutionStatus from './enums/execution-status.enum';

export interface ExecutionRepository<T = any> {
  manager: EntityManager;
  create(execution: Partial<Execution<T>>): Execution<T>;
  save(
    execution: Execution<T> | Execution<T>[],
  ): Promise<Execution<T> | Execution<T>[]>;
  findOne(
    findOneOptions?: FindOneOptions<Execution<T>>,
  ): Promise<Execution<T> | null>;
  findOneBy(
    where: FindOptionsWhere<Execution<T>> | FindOptionsWhere<Execution<T>>[],
  ): Promise<Execution<T> | null>;
  createExecution<K extends Partial<Execution<T>> | Partial<Execution<T>>[]>(
    executionDto: K,
    type: ExecutionTypeEnum,
  ): Promise<K extends any[] ? Execution<T>[] : Execution<T>>;
  startExecution(execution: Execution<T>): Promise<Execution<T>>;
  finishExecution(values: {
    execution: Execution<T>;
    output?: ParameterValue;
    status?: ExecutionStatus;
    errorMessage?: string | null;
  }): Promise<Execution<T>>;
}
