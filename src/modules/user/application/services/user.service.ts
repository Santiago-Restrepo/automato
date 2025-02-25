import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async findOneByOrFail(query: Partial<User>): Promise<User> {
    return this.userRepository.findOneByOrFail(query);
  }

  async create(user: Pick<User, 'username' | 'password'>): Promise<User> {
    return this.userRepository.create(user);
  }
}
