import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { Public } from 'src/shared/decorators/is-public.decorator';
import { SignInDto } from '../../application/dtos/sign-in.dto';
import { RegisterDto } from '../../application/dtos/register.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  login(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('signup')
  singup(@Body() registerDto: RegisterDto) {
    return this.authService.signup(registerDto);
  }
}
