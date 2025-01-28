import { Module } from '@nestjs/common';
import { UserService } from './application/services/user.service';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository.impl';
import { EncryptionModule } from '../encryption/encryption.module';

@Module({
  imports: [EncryptionModule],
  providers: [
    UserService,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
