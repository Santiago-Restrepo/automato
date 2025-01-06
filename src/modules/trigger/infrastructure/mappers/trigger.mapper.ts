import { Trigger } from '../../domain/entities/trigger.entity';
import { TriggerOrmEntity } from '../entities/trigger.orm-entity';

export class TriggerMapper {
  static toDomain(ormEntity: TriggerOrmEntity): Trigger {
    return new Trigger(
      ormEntity.id,
      ormEntity.description,
      ormEntity.isActive,
      ormEntity.payloadKey,
      ormEntity.flowVersionId,
    );
  }

  static toOrm(domain: Trigger): TriggerOrmEntity {
    const trigger = new TriggerOrmEntity();
    trigger.id = domain.id;
    trigger.description = domain.description;
    trigger.isActive = domain.isActive;
    trigger.payloadKey = domain.payloadKey;
    trigger.flowVersionId = domain.flowVersionId;
    return trigger;
  }
}
