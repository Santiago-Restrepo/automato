import FunctionParameter from 'src/modules/function-parameter/domain/function-parameter.entity';
import BaseEntity from 'src/shared/base-entity.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({
  name: 'function',
})
export default class FunctionEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => FunctionParameter, (parameter) => parameter.function)
  parameters: FunctionParameter[];
}
