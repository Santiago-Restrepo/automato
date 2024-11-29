import Flow from 'src/modules/flow/domain/flow.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import StepExecution from 'src/modules/step-execution/domain/step-execution.entity';
import { TriggerExecution } from 'src/modules/trigger-execution/domain/trigger-execution.entity';
import ExecutionEntity from 'src/shared/execution.entity';

@Entity()
export default class FlowExecution extends ExecutionEntity {
  @Column('int')
  flowId: number;

  @Column({ type: 'int', nullable: true })
  triggerExecutionId: number | null;

  @OneToMany(
    () => StepExecution,
    (stepExecution) => stepExecution.flowExecution,
    {
      cascade: true,
    },
  )
  stepExecutions: StepExecution[];

  @ManyToOne(() => Flow, (flow) => flow.flowExecutions)
  flow: Flow;

  @ManyToOne(
    () => TriggerExecution,
    (triggerExecution) => triggerExecution.flowExecutions,
  )
  triggerExecution: TriggerExecution;
}
