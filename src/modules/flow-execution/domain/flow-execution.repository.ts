import { EntityManager, FindOptionsWhere } from 'typeorm';
import FlowExecution from './flow-execution.entity';

export interface FlowExecutionRepository {
  manager: EntityManager;
  create(flowExecution: Partial<FlowExecution>): FlowExecution;
  save(flowExecution: FlowExecution): Promise<FlowExecution>;
  findOneBy(
    where: FindOptionsWhere<FlowExecution> | FindOptionsWhere<FlowExecution>[],
  ): Promise<FlowExecution | null>;
  startExecution(flowExecution: FlowExecution): Promise<FlowExecution>;
}
