import { Category } from "./Categories";

export interface Product {
  categoryId: Category;
  _id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  stock?: number;
  sizes?: string[];
}

export interface SingleProductType {
  singleProduct: Product | undefined;
  loading: boolean;
  error?: string;
}

// intial products in reducer
export interface ProductReducerType {
  products: Product[];
  offset: number;
  limit: number;
  priceRange: number[];
  error?: string;
  loading: boolean;
  searchText: string;
  pageNumber: number;
}
