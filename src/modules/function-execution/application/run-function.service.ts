import { Injectable } from '@nestjs/common';
import functions, { StepFunctions } from './functions';
import Step from 'src/modules/step/domain/step.entity';
import Execution from 'src/modules/execution/domain/execution.entity';
import { ClientService } from 'src/modules/client/application/client.service';
import { FlowIntegrationService } from 'src/modules/integration/application/flow-integration.service';

@Injectable()
export class RunFunctionService {
  functions: StepFunctions;
  constructor(
    private readonly flowIntegrationService: FlowIntegrationService,
    private readonly clientService: ClientService,
  ) {
    this.functions = functions;
  }

  async run(stepExecution: Execution<Step>) {
    const { referenceStep: step } = stepExecution;
    if (!step.flow) throw new Error('Step or flow not found in step execution');
    const flowIntegrations =
      await this.flowIntegrationService.getFlowIntegrations(step.flow);
    this.clientService.initialize(flowIntegrations);

    const stepFunction = this.#getStepFunction(step);

    return stepFunction({
      input: stepExecution.input,
      context: {
        flow: step.flow,
        step,
        clientService: this.clientService,
      },
    });
  }

  #getStepFunction(step: Step) {
    const { functionName: functionName } = step;

    return this.functions[functionName];
  }
}
