import { StepFunction } from '..';

interface GetGoogleSheetsSpreadsheetDataParams {
  spreadsheetId: string;
  range: string;
}

const getGoogleSheetsSpreadsheetData: StepFunction<
  GetGoogleSheetsSpreadsheetDataParams
> = async ({ input, context }) => {
  const { spreadsheetId, range } = input;
  const googleSheetsClient = context.clientService.getClient('GoogleSheets');
  const data = await googleSheetsClient.getSpreadsheetData(
    spreadsheetId,
    range,
  );
  return data;
};

export default getGoogleSheetsSpreadsheetData;
