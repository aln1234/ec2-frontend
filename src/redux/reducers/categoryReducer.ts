import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { categoriesGet } from "../../api/productFetch";
import { CategoryReducerType } from "../../types/Categories";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../../api/CategoryFetch";

export const initialState: CategoryReducerType = {
  categories: [],
  categoryId: "",
  error: "",
  loading: false,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<string>) => {
      state.categoryId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoriesGet.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(categoriesGet.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(categoriesGet.rejected, (state, action) => {
        state.error = action.payload as string;
      });
    builder
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(createCategory.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.error = action.payload as string;
      });
    builder
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (p) => p._id !== action.payload._id
        );
      })

      .addCase(deleteCategory.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        if (action.payload instanceof Error) {
          return {
            ...state,
            loading: false,
            error: action.payload.message,
          };
        }
      });
    builder
      .addCase(updateCategory.fulfilled, (state, action) => {
        const foundIndex = state.categories.findIndex(
          (p) => p._id === action.payload._id
        );
        if (foundIndex >= 0) {
          state.categories[foundIndex] = action.payload;
        }
      })
      .addCase(updateCategory.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

const categoryReducer = categorySlice.reducer; // contain current value of property 'productReducer' in global state
export const { setCategoryId } = categorySlice.actions;
export default categoryReducer;
