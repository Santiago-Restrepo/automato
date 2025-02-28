import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFlowIntegrationSecretDto {
  @ApiProperty()
  @IsOptional()
  @IsInt()
  id: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  flowIntegrationId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  key: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  value: string;
}
