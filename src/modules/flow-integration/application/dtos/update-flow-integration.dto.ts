import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import { FlowIntegrationSecret } from '../../domain/flow-integration-secret.entity';

export class UpdateFlowIntegrationDto {
  @ApiProperty()
  @IsArray()
  @IsOptional()
  secrets: FlowIntegrationSecret[];
}
