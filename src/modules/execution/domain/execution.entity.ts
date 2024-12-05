import ExecutionStatus from 'src/modules/execution/domain/enums/execution-status.enum';
import { Column, Entity, ManyToOne } from 'typeorm';
import ExecutionTypeEnum from './enums/execution-type.enum';
import { ParameterValue } from 'src/shared/types/parameter-value.type';
import BaseEntity from 'src/shared/base-entity.entity';
import Step from 'src/modules/step/domain/step.entity';
import { Trigger } from 'src/modules/trigger/domain/trigger.entity';
import Flow from 'src/modules/flow/domain/flow.entity';

@Entity()
export default class Execution<T = any> extends BaseEntity {
  @Column('enum', { enum: ExecutionTypeEnum })
  type: ExecutionTypeEnum;

  @Column({ type: 'int', nullable: true })
  parentExecutionId?: number | null;

  @Column({ type: 'int', nullable: true })
  referenceTriggerId: number | null;

  @Column({ type: 'int', nullable: true })
  referenceFlowId: number | null;

  @Column({ type: 'int', nullable: true })
  referenceStepId: number | null;

  @Column('enum', { enum: ExecutionStatus, default: ExecutionStatus.PENDING })
  status: ExecutionStatus;

  @Column({ type: 'text', nullable: true })
  errorMessage?: string | null;

  @Column('jsonb', { nullable: true })
  input: ParameterValue;

  @Column('jsonb', { nullable: true })
  output?: ParameterValue;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  finishedAt: Date | null;

  @ManyToOne(() => Execution, { nullable: true })
  parentExecution: Execution;

  @ManyToOne(() => Trigger, (trigger) => trigger.triggerExecutions)
  referenceTrigger: Trigger & T;

  @ManyToOne(() => Flow, (flow) => flow.flowExecutions)
  referenceFlow: Flow & T;

  @ManyToOne(() => Step, (step) => step.stepExecutions)
  referenceStep: Step & T;
}
