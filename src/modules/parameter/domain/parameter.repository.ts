import Step from 'src/modules/step/domain/step.entity';
import { Parameter } from './parameter.entity';
import Execution from 'src/modules/execution/domain/execution.entity';
import Flow from 'src/modules/flow/domain/flow.entity';

export interface ParameterRepository {
  getStepParameters(
    step: Step,
    flowExecution: Execution<Flow>,
  ): Promise<Parameter[]>;

  save(parameter: Parameter): Promise<Parameter>;
}
