import { StepFunction } from '..';

interface ArrayToGoogleSheetsValuesParams {
  data: any[];
}

const arrayToGoogleSheetsValues: StepFunction<
  ArrayToGoogleSheetsValuesParams
> = async ({ input }) => {
  const { data } = input;
  const keys = Object.keys(data[0]);

  return [keys, ...data.map((item) => keys.map((key) => item[key]))];
};

export default arrayToGoogleSheetsValues;
