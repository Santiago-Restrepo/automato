import { FunctionParameter } from 'src/modules/function-parameter/domain/entities/function-parameter.entity';
import { ParameterValue } from 'src/shared/types/parameter-value.type';

export class StepParameter {
  constructor(
    public readonly id: number,
    public value: ParameterValue,
    public inputStepId: number,
    public outputStepId: number | null,
    public functionParameterId: number,
    public functionParameter: FunctionParameter,
  ) {}
}
