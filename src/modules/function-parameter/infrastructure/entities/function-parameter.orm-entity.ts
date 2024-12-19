import FunctionBlockOrmEntity from 'src/modules/function/infrastructure/entities/function-block.orm-entity';
import BaseEntity from 'src/shared/base-entity.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';

@Entity({ name: 'function_parameters' })
@Index(['key', 'function_id'], { unique: true })
export default class FunctionParameterOrmEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  key: string;

  @Column({ type: 'int' })
  function_id: number;

  @ManyToOne(
    () => FunctionBlockOrmEntity,
    (functionEntity) => functionEntity.parameters,
  )
  function: FunctionBlockOrmEntity;
}
