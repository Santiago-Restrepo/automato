import Block from 'src/modules/block/domain/block.entity';
import { FunctionBlock } from 'src/modules/function-block/domain/function-block.entity';
import { Parameter } from 'src/modules/parameter/domain/parameter.entity';
import BaseEntity from 'src/shared/base-entity.entity';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';

@Entity()
@Index(['key', 'functionBlockId'], { unique: true })
export class FunctionParameter extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  key: string;

  @Column({ type: 'int' })
  functionBlockId: number;

  @ManyToOne(
    () => FunctionBlock,
    (functionBlock) => functionBlock.functionParameters,
  )
  functionBlock: Block;

  @OneToMany(() => Parameter, (parameter) => parameter.functionParameter)
  parameters: Parameter[];
}
