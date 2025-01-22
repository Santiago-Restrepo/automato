import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateStepDto {
  @IsInt()
  @IsNotEmpty()
  flowId: string;

  @IsInt()
  @IsNotEmpty()
  order: number;
}
