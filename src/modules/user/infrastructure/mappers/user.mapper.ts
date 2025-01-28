import { User } from '../../domain/entities/user.entity';
import { UserOrmEntity } from '../entities/user.orm-entity';

export class UserMapper {
  static toDomain(ormEntity: UserOrmEntity, decryptedPassword: string): User {
    return new User(ormEntity.id, ormEntity.username, decryptedPassword);
  }

  static toOrm(
    user: Omit<User, 'password' | 'id'>,
    encryptedPassword: Buffer,
  ): UserOrmEntity {
    const ormEntity = new UserOrmEntity();
    ormEntity.username = user.username;
    ormEntity.password = encryptedPassword;
    return ormEntity;
  }
}
