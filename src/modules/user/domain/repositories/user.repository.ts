import { User } from '../entities/user.entity';

export interface UserRepository {
  findOneBy(query: Partial<User>): Promise<User | null>;
  create(user: Pick<User, 'username' | 'password'>): Promise<User>;
}
