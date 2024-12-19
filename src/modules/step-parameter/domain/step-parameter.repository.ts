import Step from 'src/modules/step/domain/step.entity';
import { StepParameter } from './step-parameter.entity';
import Execution from 'src/modules/execution/domain/execution.entity';
import Flow from 'src/modules/flow/domain/flow.entity';

export interface StepParameterRepository {
  getStepParameters(
    step: Step,
    flowExecution: Execution<Flow>,
  ): Promise<StepParameter[]>;

  save(parameter: StepParameter): Promise<StepParameter>;
}
