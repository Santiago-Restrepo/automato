import { FunctionParameter } from 'src/modules/function-parameter/domain/entities/function-parameter.entity';
import { ParameterValue } from 'src/shared/types/parameter-value.type';

export class StepParameter {
  constructor(
    public readonly id: number,
    public value: ParameterValue,
    public inputStepId: string,
    public outputStepId: string | null,
    public functionParameterId: number,
    public functionParameter: FunctionParameter,
  ) {}
}
