import { ParameterValue } from 'src/shared/types/parameter-value.type';
import Flow from 'src/modules/flow/domain/flow.entity';
import Step from 'src/modules/step/domain/step.entity';
import getPropertiesFromObject from './get-properties-from-object.function';
import { ClientService } from 'src/modules/client/application/client.service';
import validateShopifyInventoryUpdate from './validate-shopify-inventory-update';
export type StepFunctionParams<T> = {
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

export type StepFunctions = Record<string, StepFunction>;

const stepFunctions: StepFunctions = {
  getPropertiesFromObject,
  validateShopifyInventoryUpdate,
};

export default stepFunctions;
