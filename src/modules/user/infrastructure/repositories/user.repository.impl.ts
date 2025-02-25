import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { DataSource, Repository } from 'typeorm';
import { UserOrmEntity } from '../entities/user.orm-entity';
import { User } from '../../domain/entities/user.entity';
import { EncryptionService } from 'src/modules/encryption/application/encryption.service';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  private repository: Repository<UserOrmEntity>;

  constructor(
    private datasource: DataSource,
    private encryptionService: EncryptionService,
  ) {
    this.repository = this.datasource.getRepository(UserOrmEntity);
  }

  async findOneByOrFail(query: Partial<User>): Promise<User> {
    const { username } = query;
    const ormEntity = await this.repository.findOneOrFail({
      where: {
        username,
      },
    });

    if (!ormEntity) {
      throw new Error('User not found');
    }
    return UserMapper.toDomain(ormEntity);
  }

  async create(user: Pick<User, 'username' | 'password'>): Promise<User> {
    const { password, ...rest } = user;
    const encryptedPassword =
      await this.encryptionService.hashPassword(password);
    const ormEntity = UserMapper.toOrm(rest, encryptedPassword);
    const savedEntity = await this.repository.save(ormEntity);
    return UserMapper.toDomain(savedEntity);
  }
}
