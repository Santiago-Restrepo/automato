import FunctionParameter from 'src/modules/function-parameter/domain/function-parameter.entity';
import Step from 'src/modules/step/domain/step.entity';
import BaseEntity from 'src/shared/base-entity.entity';
import { ParameterValue } from 'src/shared/types/parameter-value.type';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'step_parameter' })
export class StepParameter extends BaseEntity {
  @Column({ type: 'jsonb', nullable: true })
  value?: ParameterValue;

  @Column({ type: 'int', nullable: true })
  functionParameterId: number;

  @Column({ type: 'int', nullable: true })
  outputStepId: number | null;

  @Column({ type: 'int' })
  inputStepId: number;

  @ManyToOne(() => Step)
  outputStep?: Step;

  @ManyToOne(() => Step, (step) => step.parameters)
  inputStep: Step;

  @ManyToOne(() => FunctionParameter)
  functionParameter: FunctionParameter;
}
