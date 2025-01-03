import { Step } from 'src/modules/step/domain/entities/step.entity';

export class Flow {
  constructor(
    public readonly id: number,
    public name: string | null,
    public createdAt: Date | null,
    public updatedAt: Date | null,
    public steps?: Step[] | null,
  ) {}

  static create(props: Partial<Flow>): Flow {
    return new Flow(
      0,
      props.name ?? '',
      new Date(),
      new Date(),
      props.steps ?? [],
    );
  }
}
