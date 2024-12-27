import { IsOptional, IsString } from 'class-validator';

export class UpdateFlowDto {
  @IsString()
  @IsOptional()
  name: string;
}
