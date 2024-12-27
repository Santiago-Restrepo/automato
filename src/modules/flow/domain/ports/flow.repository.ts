import { Flow } from '../entities/flow.entity';

export interface FlowRepository {
  findAll(): Promise<Flow[]>;
  findOne(query: Partial<Flow>): Promise<Flow | null>;
  findFlowToRun(id: number): Promise<Flow>;
  create(flow: Partial<Flow>): Promise<Flow>;
  update(id: number, flow: Partial<Flow>): Promise<Flow>;
  save(flow: Flow): Promise<Flow>;
}
