import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { RegisterDataType, UserType } from "../types/AuthType";

const urls: { [key: string]: string } = {
  register: "https://fs16-backend.vercel.app/api/v1/users",
  userIsAvailable: "https://fs16-backend.vercel.app/api/v1/users/is-available",
};

export const registerUser = createAsyncThunk<
  UserType,
  RegisterDataType,
  { rejectValue: string }
>("registerUser", async function (formattedData, { rejectWithValue }) {
  try {
    const response = await axios.post(urls.register, formattedData);
    const data: UserType = await response.data;
    toast("User created successfully");
    return data;
  } catch (e) {
    const error = e as AxiosError;
    toast(error.message);
    return rejectWithValue(error.message);
  }
});

export const checkIsUser = createAsyncThunk(
  "checkUser",
  async function (user: { email: string }) {
    try {
      const response = await axios.post(urls.userIsAvailable, user);
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      toast(error.message);
      return error;
    }
  }
);
