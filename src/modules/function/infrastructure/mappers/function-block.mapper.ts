import { FunctionBlock } from '../../domain/entities/function-block.entity';
import FunctionBlockOrmEntity from '../entities/function-block.orm-entity';

export class FunctionBlockMapper {
  static toDomain(ormEntity: FunctionBlockOrmEntity): FunctionBlock {
    return new FunctionBlock(ormEntity.name, ormEntity.description);
  }

  static toOrm(domain: FunctionBlock): FunctionBlockOrmEntity {
    const ormEntity = new FunctionBlockOrmEntity();
    ormEntity.name = domain.name;
    ormEntity.description = domain.description;
    return ormEntity;
  }
}
