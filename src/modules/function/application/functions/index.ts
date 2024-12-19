import { ParameterValue } from 'src/shared/types/parameter-value.type';
import Flow from 'src/modules/flow/domain/flow.entity';
import Step from 'src/modules/step/domain/step.entity';
import getPropertiesFromObject from './common/get-properties-from-object.function';
import { ClientService } from 'src/modules/client/application/client.service';
import validateShopifyInventoryUpdate from './shopify/validate-shopify-inventory-update.function';
import arrayToGoogleSheetsValues from './google-sheets/array-to-google-sheets-values.function';
import updateGoogleSheetsSpreadsheetData from './google-sheets/update-google-sheets-spreadsheet-data.function';
import getGoogleSheetsSpreadsheetData from './google-sheets/get-google-sheets-spreadsheet-data.function';
import transformSheetsResponse from './google-sheets/transform-sheets-response.function';
import updateArrayElement from './common/update-array-element.function';
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
  arrayToGoogleSheetsValues,
  updateGoogleSheetsSpreadsheetData,
  getGoogleSheetsSpreadsheetData,
  transformSheetsResponse,
  updateArrayElement,
};

export default stepFunctions;
