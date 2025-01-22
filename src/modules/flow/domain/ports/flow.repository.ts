import { Flow } from '../entities/flow.entity';

export interface FlowRepository {
  findAll(): Promise<Flow[]>;
  findOne(query: Partial<Flow>): Promise<Flow | null>;
  findFlowToRun(flowId: string): Promise<Flow>;
  create(flow: Partial<Flow>): Promise<Flow>;
  update(id: string, flow: Partial<Flow>): Promise<Flow>;
  save(flow: Flow): Promise<Flow>;
}
