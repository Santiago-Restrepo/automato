import { Integration } from '../../domain/entities/integration.entity';
import IntegrationOrmEntity from '../entities/integration.orm-entity';

export class IntegrationMapper {
  static toDomain(entity: IntegrationOrmEntity): Integration {
    return new Integration(entity.id, entity.name);
  }

  static toOrm(domain: Integration): IntegrationOrmEntity {
    const ormEntity = new IntegrationOrmEntity();
    ormEntity.id = domain.id;
    ormEntity.name = domain.name;
    return ormEntity;
  }
}
