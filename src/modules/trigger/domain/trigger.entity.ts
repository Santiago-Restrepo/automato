import Execution from 'src/modules/execution/domain/execution.entity';
import Flow from 'src/modules/flow/domain/flow.entity';
import BaseEntity from 'src/shared/base-entity.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Trigger extends BaseEntity {
  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'varchar', length: 255 })
  payloadKey: string;

  @Column({ type: 'int' })
  flowId: number;

  @ManyToOne(() => Flow, (flow) => flow.triggers)
  flow: Flow;

  @OneToMany(
    () => Execution<Trigger>,
    (triggerExecution) => triggerExecution.referenceTrigger,
  )
  triggerExecutions: Execution<Trigger>[];
}
