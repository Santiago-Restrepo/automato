import { ClientKeys } from 'src/modules/client/domain/enums/client-keys.enum';

export class FlowIntegration {
  constructor(
    public readonly id: number,
    public integrationId: number,
    public flowId: string,
    public clientEmail: string | null,
    public privateKey: string | null,
    public clientId: string | null,
    public clientSecret: string | null,
    public apiKey: string | null,
    public integrationName?: ClientKeys,
  ) {}

  static create(
    props: Pick<
      FlowIntegration,
      'integrationId' | 'flowId' | 'integrationName'
    > &
      Partial<FlowIntegration>,
  ): FlowIntegration {
    return new FlowIntegration(
      0,
      props.integrationId,
      props.flowId,
      props.clientEmail ?? null,
      props.privateKey ?? null,
      props.clientId ?? null,
      props.clientSecret ?? null,
      props.apiKey ?? null,
      props.integrationName,
    );
  }
}
