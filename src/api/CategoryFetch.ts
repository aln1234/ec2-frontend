import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { Category } from "../types/Categories";

import { CategoryCreate, CategoryUpdate } from "../types/dashboard/Category";

const urls: { [key: string]: string } = {
  categories: "https://fs16-backend.vercel.app/api/v1/categories",
};

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

export const createCategory = createAsyncThunk<
  Category,
  CategoryCreate,
  { rejectValue: string }
>("createCategory", async function (formattedData, { rejectWithValue }) {
  try {
    const response = await axios.post(urls.categories, formattedData);
    toast("Categories created successfully");
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    toast(error?.response?.data as string);
    return rejectWithValue(error.message);
  }
});

export const updateCategory = createAsyncThunk<
  Category,
  CategoryUpdate,
  { rejectValue: string }
>("categoriesUpdate", async function (formattedData, { rejectWithValue }) {
  try {
    const { token, _id, ...dataWithoutoken } = formattedData;
    const response = await axios.put(
      ` ${urls.categories}/${_id}`,
      dataWithoutoken,
      {
        headers: {
          Authorization: `Bearer ${formattedData.token}`,
        },
      }
    );

    toast("Category updated successfully");
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    toast(error?.response?.data as string);
    return rejectWithValue(error.message);
  }
});

export const deleteCategory = createAsyncThunk(
  "deleteCategory",
  async function (data: any, { rejectWithValue }) {
    const { token, ...id } = data;
    try {
      const response = await axios.delete(`${urls.categories}/${id.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast("Category deleted successfully");
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      toast(error?.response?.data as string);
      return rejectWithValue(error.message);
    }
  }
);
