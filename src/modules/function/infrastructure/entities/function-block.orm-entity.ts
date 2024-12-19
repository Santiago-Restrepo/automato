import FunctionParameterOrmEntity from 'src/modules/function-parameter/infrastructure/entities/function-parameter.orm-entity';
import BaseEntity from 'src/shared/base-entity.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({
  name: 'functions',
})
export default class FunctionBlockOrmEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(
    () => FunctionParameterOrmEntity,
    (parameter) => parameter.function,
  )
  parameters: FunctionParameterOrmEntity[];
}
