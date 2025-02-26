import { Injectable } from '@nestjs/common';
import functions from '../functions';
import { ClientService } from 'src/modules/client/application/client.service';
import { Execution } from 'src/modules/execution/domain/entities/execution.entity';
import { Step } from 'src/modules/step/domain/entities/step.entity';
import { GetFlowIntegrationService } from 'src/modules/flow-integration/application/services/get-flow-integrations.service';
import { StepFunction } from '../../domain/entities/step-function.entity';

@Injectable()
export class RunFunctionService {
  functions: Record<string, StepFunction>;
  constructor(
    private readonly getFlowIntegrationService: GetFlowIntegrationService,
    private readonly clientService: ClientService,
  ) {
    this.functions = functions;
  }

  async run(stepExecution: Execution<Step>) {
    const { referenceStep: step } = stepExecution;
    if (!step?.flow)
      throw new Error('Step or flow not found in step execution');
    const flowIntegrations =
      await this.getFlowIntegrationService.getFlowIntegrations(step?.flowId);
    this.clientService.initialize(flowIntegrations);
    const stepFunction = this.#getStepFunction(step);
    if (!stepFunction)
      throw new Error(`Step function ${step?.functionBlock?.name} not found`);
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
    const functionName = step.functionBlock?.name;
    const functionVersion = step.functionBlock?.version || 'latest';

    if (!functionName) return null;

    const availableFunctions = this.functions[functionName];
    if (!availableFunctions) return null;

    return availableFunctions[functionVersion] || availableFunctions['latest'];
  }
}
