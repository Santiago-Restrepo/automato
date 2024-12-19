// Infrastructure Layer
import { TriggerMapper } from 'src/modules/trigger/infrastructure/mappers/trigger.mapper';
import { Execution } from '../../domain/entities/execution.entity';
import ExecutionOrmEntity from '../entities/execution.orm-entity';
import { FlowMapper } from 'src/modules/flow/infrastructure/mappers/flow.mapper';
import { StepMapper } from 'src/modules/step/infrastructure/mappers/step.mapper';

export class ExecutionMapper {
  static toDomain(entity: ExecutionOrmEntity): Execution {
    return new Execution(
      entity.id,
      entity.type,
      entity.parentExecutionId || null,
      entity.referenceTriggerId || null,
      entity.referenceFlowId || null,
      entity.referenceStepId || null,
      entity.status,
      entity.errorMessage || null,
      entity.input || null,
      entity.output || null,
      entity.startedAt,
      entity.finishedAt || null,
      entity.parentExecution
        ? ExecutionMapper.toDomain(entity.parentExecution)
        : null,
      entity.referenceTrigger
        ? TriggerMapper.toDomain(entity.referenceTrigger)
        : null,
      entity.referenceFlow ? FlowMapper.toDomain(entity.referenceFlow) : null,
      entity.referenceStep ? StepMapper.toDomain(entity.referenceStep) : null,
    );
  }

  static toOrm(domain: Execution): ExecutionOrmEntity {
    const ormEntity = new ExecutionOrmEntity();
    ormEntity.id = domain.id;
    ormEntity.type = domain.type;
    ormEntity.parentExecutionId = domain.parentExecutionId;
    ormEntity.referenceTriggerId = domain.referenceTriggerId;
    ormEntity.referenceFlowId = domain.referenceFlowId;
    ormEntity.referenceStepId = domain.referenceStepId;
    ormEntity.status = domain.status;
    ormEntity.errorMessage = domain.errorMessage;
    ormEntity.input = domain.input;
    ormEntity.output = domain.output;
    ormEntity.startedAt = domain.startedAt;
    ormEntity.finishedAt = domain.finishedAt;
    return ormEntity;
  }
}
