import ExecutionOrmEntity from 'src/modules/execution/infrastructure/entities/execution.orm-entity';
import FlowOrmEntity from 'src/modules/flow/infrastructure/entities/flow.orm-entity';
import BaseEntity from 'src/shared/base-entity.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({
  name: 'triggers',
})
export class TriggerOrmEntity extends BaseEntity {
  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'varchar', length: 255 })
  payloadKey: string;

  @Column({ type: 'varchar' })
  flowVersionId: string;

  @ManyToOne(() => FlowOrmEntity, (flow) => flow.triggers)
  flow: FlowOrmEntity;

  @OneToMany(
    () => ExecutionOrmEntity<TriggerOrmEntity>,
    (triggerExecution) => triggerExecution.referenceTrigger,
  )
  triggerExecutions: ExecutionOrmEntity<TriggerOrmEntity>[];
}
