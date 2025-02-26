import { StepFunction } from 'src/modules/function/domain/entities/step-function.entity';

export interface TransformSheetsResponseParams {
  sheetsResponse: any[][];
}
const transformSheetsResponse: StepFunction<
  TransformSheetsResponseParams
> = async ({ input }) => {
  const { sheetsResponse: response } = input;
  if (response.length < 2) {
    throw new Error(
      'Response must contain at least a header row and one data row.',
    );
  }

  const [headers, ...rows] = response;

  return rows.map((row) =>
    row.reduce<Record<string, any>>((obj, value, index) => {
      const key = headers[index];
      obj[key] = value;
      return obj;
    }, {}),
  );
};

export default transformSheetsResponse;
