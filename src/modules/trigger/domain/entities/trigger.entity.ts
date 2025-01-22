import { Flow } from 'src/modules/flow/domain/entities/flow.entity';

export class Trigger {
  constructor(
    public readonly id: string,
    public description: string | null,
    public isActive: boolean,
    public payloadKey: string,
    public flowId: string,
    public flow?: Flow | null,
  ) {}

  static create(
    props: Pick<Trigger, 'isActive' | 'payloadKey' | 'flowId'> &
      Partial<Trigger>,
  ): Trigger {
    return new Trigger(
      props.id ?? crypto.randomUUID(),
      props.description ?? null,
      props.isActive,
      props.payloadKey,
      props.flowId,
    );
  }
}
