import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateStepDto {
  @IsInt()
  @IsNotEmpty()
  flowId: number;

  @IsInt()
  @IsNotEmpty()
  order: number;
}
