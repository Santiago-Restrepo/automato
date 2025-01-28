import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateFlowDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;
}
