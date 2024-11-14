import { FindOneOptions } from 'typeorm';
import StepExecution from './step-execution.entity';

export interface StepExecutionRepository {
  create(stepExecution: Partial<StepExecution>): StepExecution;
  save(stepExecution: StepExecution | StepExecution[]): Promise<StepExecution>;
  findOne(
    findOneOptions?: FindOneOptions<StepExecution>,
  ): Promise<StepExecution | null>;
}
