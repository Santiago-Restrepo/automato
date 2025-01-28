import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateStepDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  flowId: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  order: number;
}
