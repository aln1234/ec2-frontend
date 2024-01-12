import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductReducerType, Product } from "../../types/Product";
import {
  categoriesFilter,
  createProduct,
  deleteProduct,
  fetchAllProductAsync,
  updateProduct,
} from "../../api/productFetch";

export const initialState: ProductReducerType = {
  products: [],
  offset: 1,
  priceRange: [0, 10000],
  searchText: "",
  limit: 10,
  loading: false,
  pageNumber: 1,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<number[]>) => {
      state.priceRange = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    sortByPrice: (state, action) => {
      state.products.sort((a, b) =>
        action.payload === "asc" ? a.price - b.price : b.price - a.price
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(fetchAllProductAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllProductAsync.rejected, (state, action) => {
        state.error = action.payload;
      });

    builder
      .addCase(categoriesFilter.fulfilled, (state, action) => {
        const filterProducts: Product[] = action.payload.sort(
          (a: Product, b: Product) => {
            return a.price - b.price;
          }
        );
        const productCount = filterProducts.length;
        return {
          ...state,
          products: filterProducts,
          pageNumber: productCount,
          loading: false,
        };
      })
      .addCase(categoriesFilter.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(categoriesFilter.rejected, (state, action) => {
        state.error = action.payload;
      });
    builder
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(createProduct.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.error = action.payload as string;
      });
    builder
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (p) => p._id !== action.payload._id
        );
      })
      .addCase(deleteProduct.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        if (action.payload instanceof Error) {
          return {
            ...state,
            loading: false,
            error: action.payload.message,
          };
        }
      });
    builder
      .addCase(updateProduct.fulfilled, (state, action) => {
        const foundIndex = state.products.findIndex(
          (p) => p._id === action.payload._id
        );
        if (foundIndex >= 0) {
          state.products[foundIndex] = action.payload;
        }
      })
      .addCase(updateProduct.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

const productReducer = productsSlice.reducer; // contain current value of property 'productReducer' in global state
export const {
  setOffset,
  setLimit,
  setPriceRange,
  setSearchText,
  sortByPrice,
} = productsSlice.actions;
export default productReducer;
