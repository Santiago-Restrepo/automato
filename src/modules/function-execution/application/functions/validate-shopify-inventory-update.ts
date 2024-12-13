import { StepFunction } from '.';
type InventoryChange = {
  available: number;
  updated_at: string;
  location_id: number;
  inventory_item_id: number;
  admin_graphql_api_id: string;
};

type ValidateShopifyInventoryUpdateParams = {
  payload: InventoryChange;
};

const validateShopifyInventoryUpdate: StepFunction<
  ValidateShopifyInventoryUpdateParams
> = async ({ input, context }) => {
  const googleSheetsClient = context.clientService.getClient('GoogleSheets');
  const data = await googleSheetsClient.getSpreadsheetData(
    '1NVgozygOpK2N4fYWE_kcBH83zZymCP4OBOomWKfU7O0',
    'data!A:E',
  );
  await googleSheetsClient.updateSpreadsheetData(
    '1NVgozygOpK2N4fYWE_kcBH83zZymCP4OBOomWKfU7O0',
    'data!A:E',
    [
      ['product_id', 'quantity'],
      [1, 2],
      [3, 'hello world'],
    ],
  );

  return data;
};

export default validateShopifyInventoryUpdate;
