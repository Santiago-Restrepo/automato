import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateFlowIntegrationSecretDto } from './create-flow-integration-secret.dto';
import { Type } from 'class-transformer';

export class CreateFlowIntegrationDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  integrationId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  flowId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFlowIntegrationSecretDto)
  secrets: CreateFlowIntegrationSecretDto[];
}
