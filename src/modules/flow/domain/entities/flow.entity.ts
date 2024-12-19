import { Step } from 'src/modules/step/domain/entities/step.entity';

export class Flow {
  constructor(
    public readonly id: number,
    public name: string | null,
    public steps?: Step[] | null,
  ) {}
}
