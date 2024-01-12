import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import PaginationQuery from "../types/PaginationQuery";
import { Product } from "../types/Product";
import { CategoryFilterType, Category } from "../types/Categories";

import {
  ProductCreateType,
  ProductUpdateType,
} from "./../types/dashboard/Product";

const urls: { [key: string]: string } = {
  products: "https://fs16-backend.vercel.app/api/v1/products",
  categories: "https://fs16-backend.vercel.app/api/v1/categories",
};

//redux thunk:middleware for using async call in redux
export const fetchAllProductAsync = createAsyncThunk<
  Product[],
  PaginationQuery,
  { rejectValue: string }
>("fetchAllProductAsync", async ({ limit, offset }, { rejectWithValue }) => {
  try {
    const jsonData = await axios(
      `${urls.products}?offset=${offset}&limit=${limit}`
    );
    const data = await jsonData.data;
    toast("Product fetch successfully");

    return data;
  } catch (e) {
    const error = e as AxiosError;
    toast(error?.response?.data as string);
    return rejectWithValue(error.message);
  }
});

//categories fetch
export const categoriesGet = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("categoriesGet", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(urls.categories);
    const data = await response.data;
    return data;
  } catch (e) {
    const error = e as AxiosError;
    toast(error?.response?.data as string);
    return rejectWithValue(error.message);
  }
});

export const categoriesFilter = createAsyncThunk<
  Product[],
  CategoryFilterType,
  { rejectValue: string }
>(
  "categoriesFilter",
  async (
    { priceRange = [0, 10000], categoryId, searchText },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios(
        `${urls.products}?price_min=${priceRange[0]}&price_max=${priceRange[1]}&name=${searchText}&categoryId=${categoryId}`
      );
      const data = await response.data;
      return data;
    } catch (e) {
      const error = e as AxiosError;
      toast(error?.response?.data as string);
      return rejectWithValue(error.message);
    }
  }
);

//singleProductfetch

export const singleProductGet = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>("singleProductGet", async function (id, { rejectWithValue }) {
  try {
    const response = await axios.get(`${urls.products}/${id}`);
    const data = await response.data;

    return data;
  } catch (e) {
    const error = e as AxiosError;
    toast(error?.response?.data as string);
    return rejectWithValue(error.message);
  }
});

//create product

export const createProduct = createAsyncThunk<
  Product,
  ProductCreateType,
  { rejectValue: string }
>("createProduct", async function (formattedData, { rejectWithValue }) {
  try {
    const response = await axios.post(urls.products, formattedData);
    toast("product created successfully");
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    toast(error?.response?.data as string);
    return rejectWithValue(error.message);
  }
});

//update product
export const updateProduct = createAsyncThunk<
  Product,
  ProductUpdateType,
  { rejectValue: string }
>("productsUpdate", async function (formattedData, { rejectWithValue }) {
  try {
    const { token, ...dataWithoutoken } = formattedData;
    const response = await axios.put<Product>(
      ` ${urls.products}/${formattedData._id}`,
      dataWithoutoken,
      {
        headers: {
          Authorization: `Bearer ${formattedData.token}`,
        },
      }
    );

    toast("product updated successfully");
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    toast(error?.response?.data as string);
    return rejectWithValue(error.message);
  }
});

//delete product
export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async function (data: any, { rejectWithValue }) {
    const { token, ...id } = data;
    try {
      const response = await axios.delete(`${urls.products}/${id.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast("product deleted successfully");
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      toast(error?.response?.data as string);
      return rejectWithValue(error.message);
    }
  }
);
