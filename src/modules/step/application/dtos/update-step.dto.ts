import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateStepDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  order?: number;

  @IsInt()
  @IsOptional()
  functionId?: number;
}
