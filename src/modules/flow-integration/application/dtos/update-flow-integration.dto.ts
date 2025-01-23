import { IsObject, IsOptional } from 'class-validator';

export class UpdateFlowIntegrationDto {
  @IsObject()
  @IsOptional()
  credentials: object;
}
