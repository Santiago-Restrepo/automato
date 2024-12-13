import { StepFunction } from '..';
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
> = async ({ input }) => {
  const { payload } = input;
  if (!payload.hasOwnProperty('available'))
    throw new Error('available not found in payload');
  if (!payload.hasOwnProperty('updated_at'))
    throw new Error('updated_at not found in payload');
  if (!payload.hasOwnProperty('location_id'))
    throw new Error('location_id not found in payload');
  if (!payload.hasOwnProperty('inventory_item_id'))
    throw new Error('inventory_item_id not found in payload');

  return payload;
};

export default validateShopifyInventoryUpdate;
