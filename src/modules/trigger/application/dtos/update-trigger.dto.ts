import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTriggerDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsString()
  @IsOptional()
  payloadKey: string;
}
