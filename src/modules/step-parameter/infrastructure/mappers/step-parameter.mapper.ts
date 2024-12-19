import { StepParameter } from '../../domain/entities/step-parameter.entity';
import { StepParameterOrmEntity } from '../entities/step-parameter.orm-entity';

export class StepParameterMapper {
  static toDomain(ormEntity: StepParameterOrmEntity): StepParameter {
    return new StepParameter(
      ormEntity.id,
      ormEntity.value,
      ormEntity.inputStepId,
      ormEntity.functionParameterId,
      ormEntity.functionParameter,
    );
  }

  static toOrm(parameter: StepParameter): StepParameterOrmEntity {
    const ormEntity = new StepParameterOrmEntity();
    ormEntity.id = parameter.id;
    ormEntity.value = parameter.value;
    ormEntity.inputStepId = parameter.inputStepId;
    ormEntity.functionParameterId = parameter.functionParameterId;
    return ormEntity;
  }
}
