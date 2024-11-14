import Step from 'src/modules/step/domain/step.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import ExecutionStatus from 'src/shared/enums/execution-status.enum'; // Enum for execution status
import BaseEntity from 'src/shared/base-entity.entity';
import FlowExecution from '../../flow-execution/domain/flow-execution.entity';

@Entity()
export default class StepExecution extends BaseEntity {
  @Column('int')
  stepId: number;

  @Column('int')
  flowExecutionId: number;

  @Column({
    type: 'enum',
    enum: ExecutionStatus,
    default: ExecutionStatus.PENDING,
  })
  status: ExecutionStatus;

  @Column({ type: 'text', nullable: true })
  errorMessage?: string | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  finishedAt: Date | null;

  @ManyToOne(() => Step, (step) => step.stepExecutions)
  step: Step | null;

  @ManyToOne(
    () => FlowExecution,
    (flowExecution) => flowExecution.stepExecutions,
  )
  flowExecution: FlowExecution;
}
