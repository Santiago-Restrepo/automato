import { Module } from '@nestjs/common';
import { AuthService } from './application/services/auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import configuration from 'src/config/configuration';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './infrastructure/guards/auth.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: configuration().auth.secret,
      signOptions: { expiresIn: '60s' },
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
