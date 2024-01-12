import { Product, ProductReducerType } from "../../types/Product";
import { dummyCategories } from "./mockCategories";

export const dummyProducts: any = [
  {
    id: 250,
    title: "XXX New Product",
    price: 10,
    description: "A description",
    images: ["https://placeimg.com/640/480/any"],
    category: dummyCategories[0],
  },
  {
    id: 251,
    title: "XXX New Product",
    price: 20,
    description: "A description",
    images: ["https://placeimg.com/640/480/any"],
    category: dummyCategories[1],
  },
  {
    id: 252,
    title: "New Product",
    price: 30,
    description: "A description",
    images: ["https://placeimg.com/640/480/any"],
    category: dummyCategories[2],
  },
];

export const initialProductState: ProductReducerType = {
  products: [],
  offset: 1,
  priceRange: [0, 10000],
  searchText: "",
  limit: 10,
  loading: false,
  pageNumber: 1,
};
