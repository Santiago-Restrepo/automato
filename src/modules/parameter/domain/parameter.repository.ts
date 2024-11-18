import Step from 'src/modules/step/domain/step.entity';
import { Parameter } from './parameter.entity';
import FlowExecution from 'src/modules/flow-execution/domain/flow-execution.entity';

export interface ParameterRepository {
  getStepParameters(
    step: Step,
    flowExecution: FlowExecution,
  ): Promise<Parameter[]>;

  save(parameter: Parameter): Promise<Parameter>;
}
