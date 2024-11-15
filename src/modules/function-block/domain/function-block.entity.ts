import { FunctionParameter } from 'src/modules/function-parameter/domain/function-parameter.entity';
import BaseEntity from 'src/shared/base-entity.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({
  name: 'function_block',
})
export class FunctionBlock extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column('jsonb')
  parametersTemplate: Record<string, string>;

  @OneToMany(
    () => FunctionParameter,
    (functionParameter) => functionParameter.functionBlock,
  )
  functionParameters: FunctionParameter[];
}
