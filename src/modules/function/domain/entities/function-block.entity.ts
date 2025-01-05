import { FunctionParameter } from 'src/modules/function-parameter/domain/entities/function-parameter.entity';

export class FunctionBlock {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string,
    public readonly parameters: FunctionParameter[] = [],
  ) {}
}
