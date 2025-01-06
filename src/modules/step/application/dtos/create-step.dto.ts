import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateStepDto {
  @IsInt()
  @IsNotEmpty()
  flowVersionId: string;

  @IsInt()
  @IsNotEmpty()
  order: number;
}
