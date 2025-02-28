import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ValidateEnvDto {
  // Server
  @IsString()
  @IsOptional()
  NODE_ENV: string;

  @IsNumber()
  PORT: number;

  // Database

  @IsString()
  POSTGRES_DB: string;

  @IsString()
  POSTGRES_USER: string;

  @IsString()
  POSTGRES_PASSWORD: string;

  @IsString()
  POSTGRES_HOST: string;

  // Encryption
  @IsString()
  ENCRYPTION_KEY: string;

  // Authentication
  @IsString()
  JWT_SECRET: string;
}
