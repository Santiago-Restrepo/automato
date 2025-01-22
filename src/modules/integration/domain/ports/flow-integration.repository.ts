import { FlowIntegration } from '../../../flow-integration/domain/flow-integration.entity';

export interface FlowIntegrationRepository {
  findByFlowId(flowId: string): Promise<FlowIntegration[]>;
  create(flowIntegration: Partial<FlowIntegration>): Promise<FlowIntegration>;
  save(flowIntegration: FlowIntegration): Promise<FlowIntegration>;
  update(
    id: number,
    flowIntegration: Partial<FlowIntegration>,
  ): Promise<FlowIntegration>;
  delete(id: number): Promise<void>;
}
