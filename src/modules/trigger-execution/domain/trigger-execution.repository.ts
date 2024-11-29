import { TriggerExecution } from './trigger-execution.entity';

export interface TriggerExecutionRepository {
  create(triggerExecution: Partial<TriggerExecution>): TriggerExecution;
  save(triggerExecution: TriggerExecution): Promise<TriggerExecution>;
}
