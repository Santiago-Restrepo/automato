import GoogleSheetsClient from '../google-sheets.client';
import ShopifyClient from '../shopify.client';

export type ClientMap = {
  Shopify: ShopifyClient;
  GoogleSheets: GoogleSheetsClient;
  Stripe: any;
};
