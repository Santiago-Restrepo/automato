import BaseEntity from 'src/shared/base-entity.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import ExecutionOrmEntity from 'src/modules/execution/infrastructure/entities/execution.orm-entity';
import { StepParameterOrmEntity } from 'src/modules/step-parameter/infrastructure/entities/step-parameter.orm-entity';
import FlowOrmEntity from 'src/modules/flow/infrastructure/entities/flow.orm-entity';
import FunctionBlockOrmEntity from 'src/modules/function/infrastructure/entities/function-block.orm-entity';

@Entity({ name: 'steps' })
export default class StepOrmEntity extends BaseEntity {
  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'int' })
  order: number;

  @Column('int')
  flowId: number;

  @Column('int', { nullable: true })
  functionId: number | null;

  @OneToMany(() => StepParameterOrmEntity, (parameter) => parameter.inputStep)
  parameters: StepParameterOrmEntity[];

  @ManyToOne(() => FlowOrmEntity, (flow) => flow.steps)
  flow: FlowOrmEntity | null;

  @ManyToOne(() => FunctionBlockOrmEntity)
  function: FunctionBlockOrmEntity | null;

  @OneToMany(
    () => ExecutionOrmEntity<StepOrmEntity>,
    (stepExecution) => stepExecution.referenceStep,
  )
  stepExecutions: ExecutionOrmEntity<StepOrmEntity>[];
}
