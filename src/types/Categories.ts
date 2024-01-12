import { PriceRange } from "./PriceRangeType";

export interface Category {
  _id: string;
  name: string;
  image: string;
}

export interface CategoryFilterType extends PriceRange {
  categoryId?: string | "";
  searchText?: string;
}

export interface CategoryReducerType {
  categories: Category[];
  categoryId: string | "";
  error: string;
  loading: boolean;
}
