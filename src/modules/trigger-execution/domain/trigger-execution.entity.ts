import FlowExecution from 'src/modules/flow-execution/domain/flow-execution.entity';
import { Trigger } from 'src/modules/trigger/domain/trigger.entity';
import ExecutionEntity from 'src/shared/execution.entity';
import { ParameterValue } from 'src/shared/types/parameter-value.type';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class TriggerExecution extends ExecutionEntity {
  @Column('jsonb', { nullable: true })
  payload: ParameterValue;

  @Column('int')
  triggerId: number;

  @ManyToOne(() => Trigger, (trigger) => trigger.triggerExecutions)
  trigger: Trigger;

  @OneToMany(
    () => FlowExecution,
    (flowExecution) => flowExecution.triggerExecution,
  )
  flowExecutions: FlowExecution[];
}
