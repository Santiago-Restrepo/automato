import Flow from 'src/modules/flow/domain/flow.entity';
import BaseEntity from 'src/shared/base-entity.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { StepParameter } from 'src/modules/step-parameter/domain/step-parameter.entity';
import Execution from 'src/modules/execution/domain/execution.entity';
import FunctionEntity from 'src/modules/function/domain/function.entity';

@Entity({ name: 'step' })
export default class Step extends BaseEntity {
  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int' })
  order: number;

  @Column('int')
  flowId: number;

  @Column('int', { nullable: true })
  functionId: number;

  @OneToMany(() => StepParameter, (parameter) => parameter.inputStep)
  parameters: StepParameter[];

  @ManyToOne(() => Flow, (flow) => flow.steps)
  flow: Flow;

  @ManyToOne(() => FunctionEntity)
  function: FunctionEntity;

  @OneToMany(
    () => Execution<Step>,
    (stepExecution) => stepExecution.referenceStep,
  )
  stepExecutions: Execution<Step>[];
}
