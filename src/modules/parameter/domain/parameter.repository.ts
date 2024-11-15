import Block from 'src/modules/block/domain/block.entity';
import { Parameter } from './parameter.entity';
import FlowExecution from 'src/modules/flow-execution/domain/flow-execution.entity';

export interface ParameterRepository {
  getBlockParameters(
    block: Block,
    flowExecution: FlowExecution,
  ): Promise<Parameter[]>;

  save(parameter: Parameter): Promise<Parameter>;
}
