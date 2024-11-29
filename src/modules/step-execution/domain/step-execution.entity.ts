import Step from 'src/modules/step/domain/step.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import FlowExecution from '../../flow-execution/domain/flow-execution.entity';
import { ParameterValue } from 'src/shared/types/parameter-value.type';
import ExecutionEntity from 'src/shared/execution.entity';

@Entity()
export default class StepExecution extends ExecutionEntity {
  @Column('int')
  stepId: number;

  @Column('int')
  flowExecutionId: number;

  @Column('jsonb', { nullable: true })
  output?: ParameterValue;

  @ManyToOne(() => Step, (step) => step.stepExecutions)
  step: Step | null;

  @ManyToOne(
    () => FlowExecution,
    (flowExecution) => flowExecution.stepExecutions,
  )
  flowExecution: FlowExecution;
}
