import StepOutput from 'src/modules/step/domain/step-output.entity';
import Step from 'src/modules/step/domain/step.entity';
import BaseEntity from 'src/shared/base-entity.entity';
import { ParameterValue } from 'src/shared/types/paramter-value.type';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'parameter' })
export class Parameter extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  key: string;

  @Column({ type: 'jsonb', nullable: true })
  value?: ParameterValue;

  @Column({ type: 'int', nullable: true })
  stepOutputId: number | null;

  @Column({ type: 'int' })
  stepId: number;

  @ManyToOne(() => StepOutput)
  stepOutput?: StepOutput;

  @ManyToOne(() => Step, (step) => step.parameters)
  step: Step;
}
