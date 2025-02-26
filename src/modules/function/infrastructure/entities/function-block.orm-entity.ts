import FunctionParameterOrmEntity from 'src/modules/function-parameter/infrastructure/entities/function-parameter.orm-entity';
import BaseEntity from 'src/shared/base-entity.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';

@Entity({
  name: 'functions',
})
@Index(['name', 'version'], { unique: true })
export default class FunctionBlockOrmEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  version: string;

  @OneToMany(
    () => FunctionParameterOrmEntity,
    (parameter) => parameter.function,
  )
  parameters: FunctionParameterOrmEntity[];
}
