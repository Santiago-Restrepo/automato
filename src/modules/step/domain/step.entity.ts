import Flow from 'src/modules/flow/domain/flow.entity';
import StepExecution from 'src/modules/step-execution/domain/step-execution.entity';
import BaseEntity from 'src/shared/base-entity.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Parameter } from 'src/modules/parameter/domain/parameter.entity';
enum StepType {
  FUNCTION = 'FUNCTION',
}

@Entity()
export default class Step extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  functionName: string;

  @Column({ type: 'enum', enum: StepType })
  type: StepType;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int' })
  order: number;

  @Column('int')
  flowId: number;

  @OneToMany(() => Parameter, (parameter) => parameter.inputStep)
  parameters: Parameter[];

  @ManyToOne(() => Flow, (flow) => flow.steps)
  flow: Flow;

  @OneToMany(() => StepExecution, (stepExecution) => stepExecution.step)
  stepExecutions: StepExecution[];
}
