import { Trigger } from '../entities/trigger.entity';

export interface TriggerRepository {
  findOneByOrFail(query: Partial<Trigger>): Promise<Trigger>;
}
