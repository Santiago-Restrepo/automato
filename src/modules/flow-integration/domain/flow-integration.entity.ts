import { ClientKeys } from 'src/modules/client/domain/enums/client-keys.enum';

export class FlowIntegration {
  constructor(
    public readonly id: number,
    public integrationId: number,
    public flowId: string,
    public credentials: object,
    public integrationName?: ClientKeys,
  ) {}

  static create(
    props: Pick<
      FlowIntegration,
      'integrationId' | 'flowId' | 'integrationName' | 'credentials'
    > &
      Partial<FlowIntegration>,
  ): FlowIntegration {
    return new FlowIntegration(
      0,
      props.integrationId,
      props.flowId,
      props.credentials,
      props.integrationName,
    );
  }
}
