import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const urls: { [key: string]: string } = {
  checkout:
    "https://fs16-backend.vercel.app/api/v1/stripe/create-checkout-session",
  orders: "https://fs16-backend.vercel.app/api/v1/orders",
};

export const createCheckout = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>("createCheckout", async function (formattedData, { rejectWithValue }) {
  try {
    const { token, ...dataWithoutoken } = formattedData;
    const response = await axios.post(urls.checkout, dataWithoutoken, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    window.location.href = response.data.url;
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    toast(error?.response?.data as string);
    return rejectWithValue(error.message);
  }
});

export const getOrderById = createAsyncThunk<any, any, { rejectValue: string }>(
  "getOrderById",
  async function (formattedData, { rejectWithValue }) {
    try {
      const { token, userId } = formattedData;
      const response = await axios.get(`${urls.orders}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      toast(error?.response?.data as string);
      return rejectWithValue(error.message);
    }
  }
);
