import { Column, Entity, Index, OneToMany } from 'typeorm';
import ExecutionOrmEntity from 'src/modules/execution/infrastructure/entities/execution.orm-entity';
import StepOrmEntity from 'src/modules/step/infrastructure/entities/step.orm-entity';
import { TriggerOrmEntity } from 'src/modules/trigger/infrastructure/entities/trigger.orm-entity';
import FlowIntegrationOrmEntity from 'src/modules/flow-integration/infrastructure/entities/flow-integration.orm-entity';
import UUIDBaseEntity from 'src/shared/uuid-base.entity';

@Entity({
  name: 'flows',
})
export default class FlowOrmEntity extends UUIDBaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string | null;

  @OneToMany(() => StepOrmEntity, (step) => step.flow)
  steps?: StepOrmEntity[] | null;

  @OneToMany(
    () => ExecutionOrmEntity<FlowOrmEntity>,
    (flowExecution) => flowExecution.referenceFlow,
  )
  flowExecutions: ExecutionOrmEntity<FlowOrmEntity>[];

  @OneToMany(() => TriggerOrmEntity, (trigger) => trigger.flow)
  triggers: TriggerOrmEntity[];

  @OneToMany(
    () => FlowIntegrationOrmEntity,
    (flowIntegration) => flowIntegration.flow,
  )
  flowIntegrations: FlowIntegrationOrmEntity[];
}
