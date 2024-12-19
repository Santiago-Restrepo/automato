import { Step } from '../entities/step.entity';

export interface StepRepository {
  findById(id: number): Promise<Step | null>;
  save(step: Step): Promise<Step>;
}
