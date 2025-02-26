import { ClientService } from 'src/modules/client/application/client.service';
import { Flow } from 'src/modules/flow/domain/entities/flow.entity';
import { Step } from 'src/modules/step/domain/entities/step.entity';
import { ParameterValue } from 'src/shared/types/parameter-value.type';

type StepFunctionParams<T> = {
  input: T;
  context: {
    flow: Flow;
    step: Step;
    clientService: ClientService;
  };
};
export type StepFunction<T = any> = (
  params: StepFunctionParams<T>,
) => Promise<ParameterValue> | ParameterValue;
