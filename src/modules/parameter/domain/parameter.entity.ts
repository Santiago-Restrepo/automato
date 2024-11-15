import BlockOutput from 'src/modules/block/domain/block-output.entity';
import Block from 'src/modules/block/domain/block.entity';
import { FunctionParameter } from 'src/modules/function-parameter/domain/function-parameter.entity';
import BaseEntity from 'src/shared/base-entity.entity';
import { ParameterValue } from 'src/shared/types/paramter-value.type';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'parameter' })
export class Parameter extends BaseEntity {
  @Column({ type: 'jsonb', nullable: true })
  value?: ParameterValue;

  @Column({ type: 'int', nullable: true })
  blockOutputId: number | null;

  @Column({ type: 'int' })
  blockId: number;

  @Column({ type: 'int' })
  functionParameterId: number;

  @ManyToOne(() => BlockOutput)
  blockOutput?: BlockOutput;

  @ManyToOne(() => Block, (block) => block.parameters)
  block: Block;

  @ManyToOne(
    () => FunctionParameter,
    (functionParameter) => functionParameter.parameters,
  )
  functionParameter: FunctionParameter;
}
