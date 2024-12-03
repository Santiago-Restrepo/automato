interface Cart {
  id: string;
  token: string;
  line_items: LineItem[];
  note: any;
  email: string;
  updated_at: string;
  created_at: string;
}

interface LineItem {
  id: number;
  quantity: number;
  variant_id: number;
  grams: number;
  line_price: string;
  price: string;
  product_id: number;
  sku: string;
  title: string;
  vendor: string;
}

interface ValidateShopifyCartParams {
  cart: Cart;
}

const validateShopifyCart = async (params: ValidateShopifyCartParams) => {
  const { cart } = params;
  if (cart.line_items?.length === 0) {
    throw new Error('Cart is empty');
  }
  return cart;
};

export default validateShopifyCart;
