import { Trigger } from '../entities/trigger.entity';

export interface TriggerRepository {
  findOneByOrFail(query: Partial<Trigger>): Promise<Trigger>;
  findAll(): Promise<Trigger[]>;
  findOne(query: Partial<Trigger>): Promise<Trigger | null>;
  create(
    trigger: Pick<Trigger, 'isActive' | 'payloadKey' | 'flowVersionId'> &
      Partial<Trigger>,
  ): Promise<Trigger>;
  save(trigger: Trigger): Promise<Trigger>;
  update(id: number, updateTriggerDto: Partial<Trigger>): Promise<Trigger>;
}
