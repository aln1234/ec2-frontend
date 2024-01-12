export interface CategoryCreate {
  name: string;
  image: string;
}

export type CategoryUpdate = Partial<CategoryCreate> & {
  _id?: string | number;
  token?: string;
};
