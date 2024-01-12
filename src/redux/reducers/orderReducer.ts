import { createSlice } from "@reduxjs/toolkit";

import { getOrderById } from "../../api/orderFetch";

const initialState: any = {
  orders: [],
  loading: false,
  error: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getOrderById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

// export const {} = cartSlice.actions;

export default orderSlice.reducer;
