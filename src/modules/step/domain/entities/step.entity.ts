import { Flow } from 'src/modules/flow/domain/entities/flow.entity';
import { FunctionBlock } from 'src/modules/function/domain/entities/function-block.entity';
import { StepParameter } from 'src/modules/step-parameter/domain/entities/step-parameter.entity';

export class Step {
  constructor(
    public readonly id: number,
    public description: string,
    public order: number,
    public flowId: number,
    public functionId: number,
    public flow: Flow | null = null,
    public parameters: StepParameter[] | null = null,
    public functionBlock: FunctionBlock | null = null,
  ) {}
}
