import { FunctionParameter } from '../../domain/entities/function-parameter.entity';
import FunctionParameterOrmEntity from '../entities/function-parameter.orm-entity';

export class FunctionParameterMapper {
  static toDomain(ormEntity: FunctionParameterOrmEntity): FunctionParameter {
    return new FunctionParameter(ormEntity.id, ormEntity.key);
  }

  static toOrm(domain: FunctionParameter): FunctionParameterOrmEntity {
    const ormEntity = new FunctionParameterOrmEntity();
    ormEntity.key = domain.key;
    return ormEntity;
  }
}
