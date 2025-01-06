import { Execution } from 'src/modules/execution/domain/entities/execution.entity';
import { Step } from 'src/modules/step/domain/entities/step.entity';
import { FlowVersion } from 'src/modules/flow/domain/entities/flow.entity';
import { StepParameter } from '../entities/step-parameter.entity';

export interface StepParameterRepository {
  getByExecution(
    step: Step,
    flowExecution: Execution<FlowVersion>,
  ): Promise<StepParameter[]>;

  getByStep(stepId: string): Promise<StepParameter[]>;
}
