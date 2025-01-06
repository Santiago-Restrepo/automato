import { Step } from '../entities/step.entity';

export interface StepRepository {
  findById(id: string): Promise<Step | null>;
  findByFlowId(flowId: number): Promise<Step[]>;
  create(
    step: Pick<Step, 'flowVersionId' | 'order'> & Partial<Step>,
  ): Promise<Step>;
  save(step: Step): Promise<Step>;
  update(id: string, step: Partial<Step>): Promise<Step>;
  delete(id: string): Promise<void>;
}
