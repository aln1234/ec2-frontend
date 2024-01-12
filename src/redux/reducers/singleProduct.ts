import { createSlice } from "@reduxjs/toolkit";

import { SingleProductType } from "./../../types/Product";
import { singleProductGet } from "../../api/productFetch";

const initialState: SingleProductType = {
  singleProduct: undefined,
  loading: true,
  error: "",
};

const singleProductSlice = createSlice({
  name: "singleproduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(singleProductGet.fulfilled, (state, action) => {
      state.singleProduct = action.payload;
    });

    builder.addCase(singleProductGet.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(singleProductGet.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

const singleProductReducer = singleProductSlice.reducer;

export default singleProductReducer;
