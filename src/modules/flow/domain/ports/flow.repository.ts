import { FlowVersion } from '../entities/flow.entity';

export interface FlowRepository {
  findAll(): Promise<FlowVersion[]>;
  findOne(query: Partial<FlowVersion>): Promise<FlowVersion | null>;
  findFlowToRun(flowId: number): Promise<FlowVersion>;
  create(flow: Partial<FlowVersion>): Promise<FlowVersion>;
  update(flowId: number, flow: Partial<FlowVersion>): Promise<FlowVersion>;
  save(flow: FlowVersion): Promise<FlowVersion>;
}
