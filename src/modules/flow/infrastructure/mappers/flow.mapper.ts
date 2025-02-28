import { StepMapper } from 'src/modules/step/infrastructure/mappers/step.mapper';
import { Flow } from '../../domain/entities/flow.entity';
import FlowOrmEntity from '../entities/flow.orm-entity';

export class FlowMapper {
  static toDomain(entity: FlowOrmEntity): Flow {
    const steps = entity.steps?.map(StepMapper.toDomain);
    return new Flow(
      entity.id,
      entity.name,
      entity.description,
      entity.createdAt,
      entity.updatedAt,
      steps,
    );
  }

  static toOrm(domain: Flow): FlowOrmEntity {
    const flow = new FlowOrmEntity();
    flow.id = domain.id;
    flow.name = domain.name;
    flow.description = domain.description;
    return flow;
  }
}
