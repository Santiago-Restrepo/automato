import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTriggerDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  payloadKey: string;

  @IsInt()
  flowId: string;
}
