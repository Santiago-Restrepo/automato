import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import { CreateFlowIntegrationSecretDto } from './create-flow-integration-secret.dto';

export class UpdateFlowIntegrationDto {
  @ApiProperty()
  @IsArray()
  @IsOptional()
  secrets: CreateFlowIntegrationSecretDto[];
}
