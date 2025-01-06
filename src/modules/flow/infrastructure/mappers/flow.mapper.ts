import { StepMapper } from 'src/modules/step/infrastructure/mappers/step.mapper';
import { FlowVersion } from '../../domain/entities/flow.entity';
import FlowOrmEntity from '../entities/flow.orm-entity';

export class FlowMapper {
  static toDomain(entity: FlowOrmEntity): FlowVersion {
    const steps = entity.steps?.map(StepMapper.toDomain);
    return new FlowVersion(
      entity.id,
      entity.flowId,
      entity.version,
      entity.name,
      entity.createdAt,
      entity.updatedAt,
      steps,
    );
  }

  static toOrm(domain: FlowVersion): FlowOrmEntity {
    const flow = new FlowOrmEntity();
    flow.id = domain.id;
    flow.flowId = domain.flowId;
    flow.version = domain.version;
    flow.name = domain.name;
    return flow;
  }
}
