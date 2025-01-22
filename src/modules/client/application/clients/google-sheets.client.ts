import { google } from 'googleapis';
import GoogleClient, { GoogleCredentials } from './google.client';

class GoogleSheetsClient extends GoogleClient {
  constructor(credentials: Partial<GoogleCredentials>) {
    super(
      {
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      },
      credentials,
    );
  }

  /**
   * Retrieves data from a specified range in a Google Sheets spreadsheet.
   * @param spreadsheetId - The ID of the spreadsheet.
   * @param range - The A1 notation of the values to retrieve.
   * @return The retrieved data, or null if no data found.
   */
  async getSpreadsheetData(
    spreadsheetId: string,
    range: string,
  ): Promise<string[][] | null> {
    const auth = await this.authorize();
    const sheets = google.sheets({ version: 'v4', auth: auth as any });

    try {
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
        valueRenderOption: 'UNFORMATTED_VALUE',
      });
      return res.data.values || null;
    } catch (error) {
      throw new Error(`Failed to fetch spreadsheet data: ${error.message}`);
    }
  }

  async updateSpreadsheetData(
    spreadsheetId: string,
    range: string,
    values: any[][],
  ): Promise<void> {
    const auth = await this.authorize();
    const sheets = google.sheets({ version: 'v4', auth: auth as any });

    try {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values,
        },
      });
    } catch (error) {
      throw new Error(`Failed to update spreadsheet data: ${error.message}`);
    }
  }
}

export default GoogleSheetsClient;
