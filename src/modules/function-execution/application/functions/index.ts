import fetchCharacterData from './fetch-characters.function';
import fetchData from './fetch-data.function';
import { sendEmail } from './send-email.function';
import validateShopifyCart from './validate-shopify-cart';
import { getPropertiesFromObject } from './get-properties-from-object.function';
import { ParameterValue } from 'src/shared/types/parameter-value.type';

type StepFunction = (
  params: ParameterValue,
) => Promise<ParameterValue> | ParameterValue;

export type StepFunctions = Record<string, StepFunction>;

const stepFunctions: StepFunctions = {
  fetchData,
  fetchCharacterData,
  validateShopifyCart,
  sendEmail,
  getPropertiesFromObject,
};

export default stepFunctions;
