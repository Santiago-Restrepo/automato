import { FlowVersion } from 'src/modules/flow/domain/entities/flow.entity';

export class Trigger {
  constructor(
    public readonly id: number,
    public description: string | null,
    public isActive: boolean,
    public payloadKey: string,
    public flowVersionId: string,
    public flowVersion?: FlowVersion | null,
  ) {}

  static create(
    props: Pick<Trigger, 'isActive' | 'payloadKey' | 'flowVersionId'> &
      Partial<Trigger>,
  ): Trigger {
    return new Trigger(
      0,
      props.description ?? null,
      props.isActive,
      props.payloadKey,
      props.flowVersionId,
    );
  }
}
