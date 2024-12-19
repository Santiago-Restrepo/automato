import { Flow } from '../entities/flow.entity';

export interface FlowRepository {
  findOne(query: Partial<Flow>): Promise<Flow | null>;
  findFlowToRun(id: number): Promise<Flow>;
  save(flow: Flow): Promise<Flow>;
}
