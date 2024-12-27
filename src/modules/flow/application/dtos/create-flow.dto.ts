import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFlowDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
