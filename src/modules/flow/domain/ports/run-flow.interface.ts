import { Execution } from 'src/modules/execution/domain/entities/execution.entity';
import { Flow } from '../entities/flow.entity';

export interface RunFlow {
  run(id: number, triggerExecution?: Execution): Promise<void>;
  runNextStep(flowExecution: Execution<Flow>): Promise<void>;
}
