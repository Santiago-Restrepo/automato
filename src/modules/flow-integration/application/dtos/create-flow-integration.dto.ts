import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateFlowIntegrationDto {
  @IsInt()
  @IsNotEmpty()
  integrationId: number;

  @IsString()
  @IsNotEmpty()
  flowId: string;

  @IsNotEmpty()
  credentials: object;
}
