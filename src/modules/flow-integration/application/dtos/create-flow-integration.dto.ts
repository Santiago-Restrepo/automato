import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateFlowIntegrationDto {
  @IsInt()
  @IsNotEmpty()
  integrationId: number;

  @IsInt()
  @IsNotEmpty()
  flowId: number;
}
