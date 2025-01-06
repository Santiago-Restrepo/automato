import { Column, Entity, Index, OneToMany } from 'typeorm';
import ExecutionOrmEntity from 'src/modules/execution/infrastructure/entities/execution.orm-entity';
import StepOrmEntity from 'src/modules/step/infrastructure/entities/step.orm-entity';
import { TriggerOrmEntity } from 'src/modules/trigger/infrastructure/entities/trigger.orm-entity';
import FlowIntegrationOrmEntity from 'src/modules/flow-integration/infrastructure/entities/flow-integration.orm-entity';
import UUIDBaseEntity from 'src/shared/uuid-base.entity';

@Entity({
  name: 'flows',
})
@Index(['flowId', 'version'], { unique: true })
export default class FlowOrmEntity extends UUIDBaseEntity {
  @Column({ type: 'int' })
  flowId: number;

  @Column({ type: 'int' })
  version: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string | null;

  @OneToMany(() => StepOrmEntity, (step) => step.flowVersion)
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
