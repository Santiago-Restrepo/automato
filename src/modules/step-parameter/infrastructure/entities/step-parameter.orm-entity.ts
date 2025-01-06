import FunctionParameterOrmEntity from 'src/modules/function-parameter/infrastructure/entities/function-parameter.orm-entity';
import StepOrmEntity from 'src/modules/step/infrastructure/entities/step.orm-entity';
import BaseEntity from 'src/shared/base-entity.entity';
import { ParameterValue } from 'src/shared/types/parameter-value.type';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'step_parameters' })
export class StepParameterOrmEntity extends BaseEntity {
  @Column({ type: 'jsonb', nullable: true })
  value?: ParameterValue;

  @Column({ type: 'int', nullable: true })
  functionParameterId: number;

  @Column({ type: 'varchar', nullable: true })
  outputStepId: string | null;

  @Column({ type: 'varchar' })
  inputStepId: string;

  @ManyToOne(() => StepOrmEntity)
  outputStep?: StepOrmEntity;

  @ManyToOne(() => StepOrmEntity, (step) => step.parameters)
  inputStep: StepOrmEntity;

  @ManyToOne(() => FunctionParameterOrmEntity)
  functionParameter: FunctionParameterOrmEntity;
}
