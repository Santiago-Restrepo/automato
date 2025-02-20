import { Module } from '@nestjs/common';
import { AuthService } from './application/services/auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './infrastructure/guards/auth.guard';
import { setupAuth } from 'src/config/auth.config';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      ...setupAuth(),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
