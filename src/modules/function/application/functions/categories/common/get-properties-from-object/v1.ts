import { StepFunction } from 'src/modules/function/domain/entities/step-function.entity';

export interface GetPropertiesFromObjectParams {
  propertiesMap: Record<string, string>;
  object: Record<string, any>;
}

export const getPropertiesFromObjectV1: StepFunction<
  GetPropertiesFromObjectParams
> = async ({ input: params }) => {
  const { propertiesMap, object } = params;
  const result = Object.entries(propertiesMap)
    .map(([key, value]) => {
      const newKey = value;
      const newValue = object[key];
      return { key: newKey, value: newValue };
    })
    .reduce((acc, { key, value }) => {
      acc[key] = value;
      return acc;
    }, {});
  return result;
};

export default getPropertiesFromObjectV1;
