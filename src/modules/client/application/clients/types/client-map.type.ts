import ShopifyClient from '../shopify.client';

export type ClientMap = {
  Shopify: ShopifyClient;
  GoogleSheets: any;
  Stripe: any;
};
