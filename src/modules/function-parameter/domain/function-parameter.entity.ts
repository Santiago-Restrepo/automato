import FunctionEntity from 'src/modules/function/domain/function.entity';
import BaseEntity from 'src/shared/base-entity.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';

@Entity({ name: 'function_parameter' })
@Index(['key', 'function_id'], { unique: true })
export default class FunctionParameter extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  key: string;

  @Column({ type: 'int' })
  function_id: number;

  @ManyToOne(
    () => FunctionEntity,
    (functionEntity) => functionEntity.parameters,
  )
  function: FunctionEntity;
}
