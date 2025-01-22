import { Flow } from 'src/modules/flow/domain/entities/flow.entity';
import { FunctionBlock } from 'src/modules/function/domain/entities/function-block.entity';
import { StepParameter } from 'src/modules/step-parameter/domain/entities/step-parameter.entity';
import * as crypto from 'crypto';
export class Step {
  constructor(
    public readonly id: string,
    public description: string | null,
    public order: number,
    public flowId: string,
    public functionId: number | null,
    public flow: Flow | null = null,
    public functionBlock: FunctionBlock | null | undefined,
    public parameters?: StepParameter[] | null,
  ) {}

  static create(props: Pick<Step, 'flowId' | 'order'> & Partial<Step>): Step {
    return new Step(
      crypto.randomUUID(),
      props.description ?? null,
      props.order,
      props.flowId,
      props.functionId ?? null,
      props.flow ?? null,
      props.functionBlock ?? null,
      props.parameters ?? null,
    );
  }
}
