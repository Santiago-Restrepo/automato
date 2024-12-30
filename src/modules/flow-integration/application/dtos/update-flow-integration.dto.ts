import { IsOptional, IsString } from 'class-validator';

export class UpdateFlowIntegrationDto {
  @IsString()
  @IsOptional()
  clientId?: string | null;

  @IsString()
  @IsOptional()
  clientSecret?: string | null;

  @IsString()
  @IsOptional()
  apiKey?: string | null;

  @IsString()
  @IsOptional()
  clientEmail?: string | null;

  @IsString()
  @IsOptional()
  privateKey?: string | null;
}
