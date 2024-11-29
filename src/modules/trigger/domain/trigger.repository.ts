import { FindOptionsWhere } from 'typeorm';
import { Trigger } from './trigger.entity';

export interface TriggerRepository {
  findOneByOrFail(
    where: FindOptionsWhere<Trigger> | FindOptionsWhere<Trigger>[],
  ): Promise<Trigger>;
}
