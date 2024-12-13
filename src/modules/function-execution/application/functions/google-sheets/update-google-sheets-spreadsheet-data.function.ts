import { StepFunction } from '..';

interface UpdateGoogleSheetsSpreadsheetDataParams {
  spreadsheetId: string;
  range: string;
  values: any[][];
}

const updateGoogleSheetsSpreadsheetData: StepFunction<
  UpdateGoogleSheetsSpreadsheetDataParams
> = async ({ input, context }) => {
  const { spreadsheetId, range, values } = input;
  const googleSheetsClient = context.clientService.getClient('GoogleSheets');
  await googleSheetsClient.updateSpreadsheetData(spreadsheetId, range, values);
};

export default updateGoogleSheetsSpreadsheetData;
