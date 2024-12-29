import { ClientKeys } from 'src/modules/client/domain/enums/client-keys.enum';
import GoogleSheetsClient from '../google-sheets.client';
import ShopifyClient from '../shopify.client';

export type ClientMap = {
  [ClientKeys.Shopify]: ShopifyClient;
  [ClientKeys.GoogleSheets]: GoogleSheetsClient;
};
