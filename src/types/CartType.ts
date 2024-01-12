import { Product } from "./Product";

export interface CartItem extends Product {
  count: number;
}

export interface CartState {
  userEmail?: string;
  products: CartItem[];
}

export interface CartStateType {
  carts: CartState[];
  url: string;
  success?: boolean;
}

export interface UserProductType extends Omit<CartState, "products"> {
  products: CartItem;
}
