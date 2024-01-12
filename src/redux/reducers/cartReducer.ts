import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartStateType, UserProductType } from "../../types/CartType";
import { createCheckout } from "../../api/orderFetch";
import { PURGE } from "redux-persist";

const initialState: CartStateType = {
  carts: [],
  url: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => ({
      ...state,
      carts: [],
    }),
    addToCart: (state, action: PayloadAction<UserProductType>) => {
      const { userEmail, products } = action.payload;
      const userCart = state.carts.find((cart) => cart.userEmail === userEmail);

      if (userCart) {
        const existingProduct = userCart.products.find(
          (p) => p._id === products._id
        );
        if (existingProduct) {
          existingProduct.count += 1;
        } else {
          userCart.products.push(products);
        }
      } else {
        state.carts.push({ userEmail, products: [products] });
      }
    },
    cartAdd: (state, action: PayloadAction<UserProductType>) => {
      const { userEmail, products } = action.payload;
      const userCart = state.carts.find((cart) => cart.userEmail === userEmail);

      if (userCart) {
        const existingProduct = userCart.products.find(
          (p) => p._id === products._id
        );
        if (existingProduct) {
          existingProduct.count += 1;
        }
      }
    },
    cartRemove: (state, action: PayloadAction<UserProductType>) => {
      const { userEmail, products } = action.payload;
      const userCart = state.carts.find((cart) => cart.userEmail === userEmail);

      if (userCart) {
        const productIndex = userCart.products.findIndex(
          (p) => p._id === products._id
        );
        if (productIndex !== -1) {
          if (userCart.products[productIndex].count > 1) {
            userCart.products[productIndex].count -= 1;
          } else {
            userCart.products.splice(productIndex, 1);
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.url = action.payload;
      })
      .addCase(createCheckout.pending, (state, action) => {
        // state.loading = true;
      })
      .addCase(createCheckout.rejected, (state, action) => {
        // state.error = action.payload as string;
      });
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { addToCart, cartAdd, cartRemove, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
