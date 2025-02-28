import { FlowMapper } from 'src/modules/flow/infrastructure/mappers/flow.mapper';
import { Step } from '../../domain/entities/step.entity';
import StepOrmEntity from '../entities/step.orm-entity';
import { StepParameterMapper } from 'src/modules/step-parameter/infrastructure/mappers/step-parameter.mapper';
import { FunctionBlockMapper } from 'src/modules/function/infrastructure/mappers/function-block.mapper';

export class StepMapper {
  static toDomain(stepOrm: StepOrmEntity): Step {
    return new Step(
      stepOrm.id,
      stepOrm.name,
      stepOrm.description,
      stepOrm.order,
      stepOrm.flowId,
      stepOrm.functionId,
      stepOrm.flow ? FlowMapper.toDomain(stepOrm.flow) : null,
      stepOrm.function ? FunctionBlockMapper.toDomain(stepOrm.function) : null,
      stepOrm.parameters
        ? stepOrm.parameters.map(StepParameterMapper.toDomain)
        : null,
    );
  }

  static toOrm(step: Step): StepOrmEntity {
    const ormEntity = new StepOrmEntity();
    ormEntity.id = step.id;
    ormEntity.flowId = step.flowId;
    ormEntity.name = step.name;
    ormEntity.description = step.description;
    ormEntity.order = step.order;
    ormEntity.functionId = step.functionId;
    ormEntity.parameters = step.parameters
      ? step.parameters.map(StepParameterMapper.toOrm)
      : [];
    return ormEntity;
  }
}
