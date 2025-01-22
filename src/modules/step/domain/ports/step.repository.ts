import { Step } from '../entities/step.entity';

export interface StepRepository {
  findById(id: string): Promise<Step | null>;
  findByFlowId(flowId: string): Promise<Step[]>;
  create(step: Pick<Step, 'flowId' | 'order'> & Partial<Step>): Promise<Step>;
  save(step: Step): Promise<Step>;
  update(id: string, step: Partial<Step>): Promise<Step>;
  updateFlowSteps(flowId: string, steps: Step[]): Promise<Step[]>;
  delete(id: string): Promise<void>;
}
