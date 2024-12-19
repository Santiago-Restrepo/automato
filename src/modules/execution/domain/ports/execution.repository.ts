import { ParameterValue } from 'src/shared/types/parameter-value.type';
import ExecutionStatus from '../enums/execution-status.enum';
import { Execution } from '../entities/execution.entity';
import ExecutionType from '../enums/execution-type.enum';
export type createExecutionDto = {
  type: ExecutionType;
  parentExecutionId?: number | null;
  referenceTriggerId?: number | null;
  referenceFlowId?: number | null;
  referenceStepId?: number | null;
  input?: ParameterValue | null;
  output?: ParameterValue | null;
};
export interface ExecutionRepository<T = any> {
  create(execution: createExecutionDto): Promise<Execution<T>>;
  createMany(executions: createExecutionDto[]): Promise<Execution<T>[]>;
  save(
    execution: Execution<T> | Execution<T>[],
  ): Promise<Execution<T> | Execution<T>[]>;
  findById(id: number): Promise<Execution<T> | null>;
  findOne(query: Partial<Execution<T>>): Promise<Execution<T> | null>;
  start(execution: Execution<T>): Promise<Execution<T>>;
  finish(values: {
    execution: Execution<T>;
    output?: ParameterValue;
    status?: ExecutionStatus;
    errorMessage?: string | null;
  }): Promise<Execution<T>>;
}
