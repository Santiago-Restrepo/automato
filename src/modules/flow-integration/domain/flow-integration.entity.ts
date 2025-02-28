import { ClientKeys } from 'src/modules/client/domain/enums/client-keys.enum';
import { FlowIntegrationSecret } from './flow-integration-secret.entity';

export class FlowIntegration {
  constructor(
    public readonly id: number,
    public integrationId: number,
    public flowId: string,
    public secrets?: FlowIntegrationSecret[],
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
      props.secrets,
      props.integrationName,
    );
  }
}
