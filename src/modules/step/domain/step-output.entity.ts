import BaseEntity from 'src/shared/base-entity.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import Step from './step.entity';

@Entity()
export default class StepOutput extends BaseEntity {
  @Column({ type: 'int' })
  stepId: number;

  @ManyToOne(() => Step, (step) => step.outputs)
  step?: Step;
}
