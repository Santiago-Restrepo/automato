import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

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
  credentials: object;
}
