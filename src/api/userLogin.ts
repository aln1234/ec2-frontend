import { createAsyncThunk } from "@reduxjs/toolkit";

import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

import { TokenType, UpdateUserType, UserType } from "../types/AuthType";
import { UserCredentialType } from "../types/CredentialType";

const urls: { [key: string]: string } = {
  login: "https://fs16-backend.vercel.app/api/v1/auth/login",
  profile: "https://fs16-backend.vercel.app/api/v1/auth/profile",
  users: "https://fs16-backend.vercel.app/api/v1/users",
};

export const userLogin = createAsyncThunk<
  TokenType,
  UserCredentialType,
  { rejectValue: string }
>("userLogin", async function (loginData, { rejectWithValue }) {
  try {
    const response = await axios.post(urls.login, loginData);
    toast("Login Successful");
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    toast(error?.response?.data as string);

    return rejectWithValue(error.message);
  }
});

export const userProfile = createAsyncThunk<
  UserType,
  string,
  { rejectValue: string }
>("userProfile", async function (token, { rejectWithValue }) {
  try {
    if (token) {
      const response = await axios.get(urls.profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
  } catch (e) {
    const error = e as AxiosError;
    toast(error?.response?.data as string);
    return rejectWithValue(error.message);
  }
});

export const getSingleUser = createAsyncThunk<
  UserType,
  string,
  { rejectValue: string }
>("userSingleUser", async function (id, { rejectWithValue }) {
  try {
    const response = await axios.get(`${urls.users}/${id}`);
    const data = await response.data;

    return data;
  } catch (e) {
    const error = e as AxiosError;
    toast(error?.response?.data as string);
    return rejectWithValue(error.message);
  }
});

export const getAllUser = createAsyncThunk<
  UserType[],
  string,
  { rejectValue: string }
>("getAllUser", async function (token, { rejectWithValue }) {
  try {
    const response = await axios.get(`${urls.users}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data;

    return data;
  } catch (e) {
    const error = e as AxiosError;

    toast(error?.response?.data as string);
    return rejectWithValue(error.message);
  }
});

export const userUpdateProfile = createAsyncThunk<
  UserType,
  UpdateUserType,
  { rejectValue: string }
>("userUpdateProfile", async function (formattedData, { rejectWithValue }) {
  try {
    const { token, _id, ...dataWithoutToken } = formattedData;
    const response = await axios.put(
      `${urls.users}/${formattedData._id}`,
      dataWithoutToken,
      {
        headers: {
          Authorization: `Bearer ${formattedData.token}`,
        },
      }
    );
    const data = await response.data;
    toast("user is updated successfully");
    return data;
  } catch (e) {
    const error = e as AxiosError;
    toast(error?.response?.data as string);
    return rejectWithValue(error.message);
  }
});

export const userUpdateTable = createAsyncThunk<
  UserType,
  UpdateUserType,
  { rejectValue: string }
>("userUpdateTable", async function (formattedData, { rejectWithValue }) {
  try {
    const { token, _id, ...dataWithoutToken } = formattedData;
    const response = await axios.put(
      `${urls.users}/${formattedData._id}`,
      dataWithoutToken,
      {
        headers: {
          Authorization: `Bearer ${formattedData.token}`,
        },
      }
    );
    const data = await response.data;
    toast("user is updated successfully");
    return data;
  } catch (e) {
    const error = e as AxiosError;
    toast(error?.response?.data as string);
    return rejectWithValue(error.message);
  }
});
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async function (data: any, { rejectWithValue }) {
    const { token, ...id } = data;
    try {
      await axios.delete(`${urls.users}/${id.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast("User deleted successfully");
    } catch (e) {
      const error = e as AxiosError;
      toast(error?.response?.data as string);
      return rejectWithValue(error.message);
    }
  }
);
