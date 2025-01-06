import { FlowVersion } from 'src/modules/flow/domain/entities/flow.entity';
import { FunctionBlock } from 'src/modules/function/domain/entities/function-block.entity';
import { StepParameter } from 'src/modules/step-parameter/domain/entities/step-parameter.entity';
import * as crypto from 'crypto';
export class Step {
  constructor(
    public readonly id: string,
    public description: string | null,
    public order: number,
    public flowVersionId: string,
    public functionId: number | null,
    public flow: FlowVersion | null = null,
    public parameters: StepParameter[] | null,
    public functionBlock: FunctionBlock | null | undefined,
  ) {}

  static create(
    props: Pick<Step, 'flowVersionId' | 'order'> & Partial<Step>,
  ): Step {
    return new Step(
      crypto.randomUUID(),
      props.description ?? null,
      props.order,
      props.flowVersionId,
      props.functionId ?? null,
      props.flow ?? null,
      props.parameters ?? null,
      props.functionBlock ?? null,
    );
  }
}
