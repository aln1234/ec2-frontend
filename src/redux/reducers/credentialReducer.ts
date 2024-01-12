import { createSlice } from "@reduxjs/toolkit";

import { CredentialStateType } from "../../types/AuthType";
import {
  getAllUser,
  userLogin,
  userProfile,
  userUpdateProfile,
  userUpdateTable,
} from "../../api/userLogin";
import { registerUser } from "../../api/userRegister";

import { PURGE } from "redux-persist";

const initialState: CredentialStateType = {
  users: [],
  user: undefined,
  token: undefined,
  error: "",
  loading: false,
  createSuccess: false,
};

const credentialSlice = createSlice({
  name: "credential",
  initialState,
  reducers: {
    logOut: (state) => ({
      ...state,
      user: undefined,
      token: { accessToken: "", refreshToken: "" },
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getAllUser.pending, (state, action) => {
        state.loading = false;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.error = action.payload;
      });
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.token = { ...action.payload };
      })
      .addCase(userLogin.pending, (state, action) => {
        state.loading = false;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.error = action.payload;
      });
    builder
      .addCase(userProfile.fulfilled, (state, action) => {
        state.user = { ...action.payload, password: "" };
      })
      .addCase(userProfile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.error = action.payload;
      });

    builder
      .addCase(userUpdateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(userUpdateProfile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userUpdateProfile.rejected, (state, action) => {
        state.error = action.payload;
      });
    builder
      .addCase(userUpdateTable.fulfilled, (state, action) => {
        const foundIndex = state.users.findIndex(
          (p) => p._id === action.payload._id
        );
        if (foundIndex >= 0) {
          state.users[foundIndex] = action.payload;
        }
      })
      .addCase(userUpdateTable.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userUpdateTable.rejected, (state, action) => {
        state.error = action.payload;
      });

    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

const credentialReducer = credentialSlice.reducer;
export const { logOut } = credentialSlice.actions;

export default credentialReducer;
