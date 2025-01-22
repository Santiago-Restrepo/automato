import { IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateFlowIntegrationDto {
  @IsObject()
  @IsOptional()
  credentials: object;
}
