import { Execution } from 'src/modules/execution/domain/entities/execution.entity';
import { Step } from 'src/modules/step/domain/entities/step.entity';
import { Flow } from 'src/modules/flow/domain/entities/flow.entity';
import { StepParameter } from '../entities/step-parameter.entity';

export interface StepParameterRepository {
  getStepParameters(
    step: Step,
    flowExecution: Execution<Flow>,
  ): Promise<StepParameter[]>;

  // save(parameter: StepParameter): Promise<StepParameter>;
}
