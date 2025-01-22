import ExecutionOrmEntity from 'src/modules/execution/infrastructure/entities/execution.orm-entity';
import FlowOrmEntity from 'src/modules/flow/infrastructure/entities/flow.orm-entity';
import UUIDBaseEntity from 'src/shared/uuid-base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({
  name: 'triggers',
})
export class TriggerOrmEntity extends UUIDBaseEntity {
  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'varchar', length: 255 })
  payloadKey: string;

  @Column({ type: 'varchar' })
  flowId: string;

  @ManyToOne(() => FlowOrmEntity, (flow) => flow.triggers)
  flow: FlowOrmEntity;

  @OneToMany(
    () => ExecutionOrmEntity<TriggerOrmEntity>,
    (triggerExecution) => triggerExecution.referenceTrigger,
  )
  triggerExecutions: ExecutionOrmEntity<TriggerOrmEntity>[];
}
