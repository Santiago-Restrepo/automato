import { Step } from 'src/modules/step/domain/entities/step.entity';
import * as crypto from 'crypto';

export class Flow {
  constructor(
    public readonly id: string,
    public name: string | null,
    public createdAt: Date | null,
    public updatedAt: Date | null,
    public steps?: Step[] | null,
  ) {}

  static create(props: Partial<Flow>): Flow {
    return new Flow(
      props.id ?? crypto.randomUUID(),
      props.name ?? '',
      new Date(),
      new Date(),
      props.steps ?? [],
    );
  }
}
