import Execution from 'src/modules/execution/domain/execution.entity';
import Step from 'src/modules/step/domain/step.entity';
import BaseEntity from 'src/shared/base-entity.entity';
import { ParameterValue } from 'src/shared/types/parameter-value.type';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'parameter' })
export class Parameter extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  key: string;

  @Column({ type: 'jsonb', nullable: true })
  value?: ParameterValue;

  @Column({ type: 'int', nullable: true })
  outputStepId: number | null;

  @Column({ type: 'int' })
  inputStepId: number;

  @ManyToOne(() => Step)
  outputStep?: Step;

  @ManyToOne(() => Step, (step) => step.parameters)
  inputStep: Step;

  @OneToMany(
    () => Execution<Parameter>,
    (execution) => execution.referenceParameter,
  )
  parameterExecutions: Execution<Parameter>[];
}
