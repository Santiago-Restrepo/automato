import { ClientKeys } from 'src/modules/client/domain/enums/client-keys.enum';

export class FlowIntegration {
  constructor(
    public readonly id: number,
    public integrationId: number,
    public flowVersionId: string,
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
      'integrationId' | 'flowVersionId' | 'integrationName'
    > &
      Partial<FlowIntegration>,
  ): FlowIntegration {
    return new FlowIntegration(
      0,
      props.integrationId,
      props.flowVersionId,
      props.clientEmail ?? null,
      props.privateKey ?? null,
      props.clientId ?? null,
      props.clientSecret ?? null,
      props.apiKey ?? null,
      props.integrationName,
    );
  }
}
