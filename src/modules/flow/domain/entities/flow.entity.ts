import { Step } from 'src/modules/step/domain/entities/step.entity';
import * as crypto from 'crypto';

export class FlowVersion {
  constructor(
    public readonly id: string,
    public readonly flowId: number,
    public readonly version: number,
    public name: string | null,
    public createdAt: Date | null,
    public updatedAt: Date | null,
    public steps?: Step[] | null,
  ) {}

  static create(props: Partial<FlowVersion>): FlowVersion {
    return new FlowVersion(
      crypto.randomUUID(),
      0,
      0,
      props.name ?? '',
      new Date(),
      new Date(),
      props.steps ?? [],
    );
  }
}
