import BaseEntity from 'src/shared/base-entity.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import Block from './block.entity';

@Entity()
export default class BlockOutput extends BaseEntity {
  @Column({ type: 'int' })
  blockId: number;

  @ManyToOne(() => Block, (block) => block.outputs)
  block?: Block;
}
