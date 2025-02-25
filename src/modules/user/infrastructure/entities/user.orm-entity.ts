import UUIDBaseEntity from 'src/shared/uuid-base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'users',
})
export class UserOrmEntity extends UUIDBaseEntity {
  @Column({
    type: 'varchar',
    unique: true,
  })
  username: string;

  @Column({ type: 'varchar' })
  password: string;
}
