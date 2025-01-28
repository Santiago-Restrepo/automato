import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional } from 'class-validator';

export class UpdateFlowIntegrationDto {
  @ApiProperty()
  @IsObject()
  @IsOptional()
  credentials: object;
}
