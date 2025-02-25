import { User } from '../entities/user.entity';

export interface UserRepository {
  findOneByOrFail(query: Partial<User>): Promise<User>;
  create(user: Pick<User, 'username' | 'password'>): Promise<User>;
}
