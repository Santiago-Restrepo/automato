import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/application/services/user.service';
import { SignInDto } from '../dtos/sign-in.dto';
import { RegisterDto } from '../dtos/register.dto';
import { EncryptionService } from 'src/modules/encryption/application/encryption.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private encryptionService: EncryptionService,
  ) {}

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ username: string; access_token: string }> {
    const { username, password } = signInDto;
    const user = await this.userService.findOneByOrFail({
      username,
    });
    const isPasswordValid = await this.encryptionService.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, username: user.username };
    return {
      username: user.username,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signup(registerDto: RegisterDto): Promise<{ id: string }> {
    return this.userService.create(registerDto);
  }
}
