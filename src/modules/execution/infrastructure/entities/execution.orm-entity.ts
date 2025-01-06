import ExecutionStatus from 'src/modules/execution/domain/enums/execution-status.enum';
import { Column, Entity, ManyToOne } from 'typeorm';
import ExecutionType from '../../domain/enums/execution-type.enum';
import { ParameterValue } from 'src/shared/types/parameter-value.type';
import BaseEntity from 'src/shared/base-entity.entity';
import StepOrmEntity from 'src/modules/step/infrastructure/entities/step.orm-entity';
import FlowOrmEntity from 'src/modules/flow/infrastructure/entities/flow.orm-entity';
import { TriggerOrmEntity } from 'src/modules/trigger/infrastructure/entities/trigger.orm-entity';

@Entity({
  name: 'executions',
})
export default class ExecutionOrmEntity<T = any> extends BaseEntity {
  @Column('enum', { enum: ExecutionType })
  type: ExecutionType;

  @Column({ type: 'int', nullable: true })
  parentExecutionId?: number | null;

  @Column({ type: 'int', nullable: true })
  referenceTriggerId: number | null;

  @Column({ type: 'varchar', nullable: true })
  referenceFlowId: string | null;

  @Column({ type: 'varchar', nullable: true })
  referenceStepId: string | null;

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

  @ManyToOne(() => ExecutionOrmEntity, { nullable: true })
  parentExecution: ExecutionOrmEntity;

  @ManyToOne(() => TriggerOrmEntity, (trigger) => trigger.triggerExecutions)
  referenceTrigger: TriggerOrmEntity & T;

  @ManyToOne(() => FlowOrmEntity, (flow) => flow.flowExecutions)
  referenceFlow: FlowOrmEntity & T;

  @ManyToOne(() => StepOrmEntity, (step) => step.stepExecutions)
  referenceStep: StepOrmEntity & T;
}
