import { ClientKeys } from 'src/modules/client/domain/enums/client-keys.enum';
import { StepFunction } from 'src/modules/function/domain/entities/step-function.entity';

export interface GetGoogleSheetsSpreadsheetDataParams {
  spreadsheetId: string;
  range: string;
}

const getGoogleSheetsSpreadsheetData: StepFunction<
  GetGoogleSheetsSpreadsheetDataParams
> = async ({ input, context }) => {
  const { spreadsheetId, range } = input;
  const googleSheetsClient = context.clientService.getClient(
    ClientKeys.GoogleSheets,
  );
  const data = await googleSheetsClient.getSpreadsheetData(
    spreadsheetId,
    range,
  );
  return data;
};

export default getGoogleSheetsSpreadsheetData;
