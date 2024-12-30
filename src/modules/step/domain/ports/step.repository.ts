import { Step } from '../entities/step.entity';

export interface StepRepository {
  findById(id: number): Promise<Step | null>;
  findByFlowId(flowId: number): Promise<Step[]>;
  create(step: Pick<Step, 'flowId' | 'order'> & Partial<Step>): Promise<Step>;
  save(step: Step): Promise<Step>;
  update(id: number, step: Partial<Step>): Promise<Step>;
  delete(id: number): Promise<void>;
}
