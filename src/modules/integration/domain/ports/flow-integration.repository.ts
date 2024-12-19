import { FlowIntegration } from '../entities/flow-integration.entity';

export interface FlowIntegrationRepository {
  findByFlowId(flowId: number): Promise<FlowIntegration[]>;
}
