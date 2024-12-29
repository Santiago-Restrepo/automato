export class Trigger {
  constructor(
    public readonly id: number,
    public description: string | null,
    public isActive: boolean,
    public payloadKey: string,
    public flowId: number,
  ) {}

  static create(
    props: Pick<Trigger, 'isActive' | 'payloadKey' | 'flowId'> &
      Partial<Trigger>,
  ): Trigger {
    return new Trigger(
      0,
      props.description ?? null,
      props.isActive,
      props.payloadKey,
      props.flowId,
    );
  }
}
