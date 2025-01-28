import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async findOneBy(query: Partial<User>): Promise<User | null> {
    return this.userRepository.findOneBy(query);
  }

  async create(user: Pick<User, 'username' | 'password'>): Promise<User> {
    return this.userRepository.create(user);
  }
}
