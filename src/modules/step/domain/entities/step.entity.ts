import { Flow } from 'src/modules/flow/domain/entities/flow.entity';
import { FunctionBlock } from 'src/modules/function/domain/entities/function-block.entity';
import { StepParameter } from 'src/modules/step-parameter/domain/entities/step-parameter.entity';

export class Step {
  constructor(
    public readonly id: number,
    public description: string | null,
    public order: number,
    public flowId: number,
    public functionId: number | null,
    public flow: Flow | null = null,
    public parameters: StepParameter[] | null,
    public functionBlock: FunctionBlock | null | undefined,
  ) {}

  static create(props: Pick<Step, 'flowId' | 'order'> & Partial<Step>): Step {
    return new Step(
      0,
      props.description ?? null,
      props.order,
      props.flowId,
      props.functionId ?? null,
      props.flow ?? null,
      props.parameters ?? null,
      props.functionBlock ?? null,
    );
  }
}
