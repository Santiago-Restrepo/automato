import { FlowIntegration } from '../../../flow-integration/domain/flow-integration.entity';

export interface FlowIntegrationRepository {
  findByFlowId(flowId: number): Promise<FlowIntegration[]>;
}
