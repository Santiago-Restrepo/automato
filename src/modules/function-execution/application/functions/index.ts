import fetchCharacterData from './fetch-characters.function';
import fetchData from './fetch-data.function';

type StepFunction = (params: Record<string, any>) => Promise<object>;

export type StepFunctions = Record<string, StepFunction>;

const stepFunctions: StepFunctions = {
  fetchData,
  fetchCharacterData,
};

export default stepFunctions;
