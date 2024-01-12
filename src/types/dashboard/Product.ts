export interface ProductCreateType {
  name: string;
  price: number;
  description?: string;
  categoryId: string;
  images: string[];
  stock: number;
}

export type ProductUpdateType = Partial<ProductCreateType> & {
  _id: number;
  token: string;
};
