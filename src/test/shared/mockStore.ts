import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../../redux/reducers/productsReducer";
import cartReducer from "../../redux/reducers/cartReducer";
import singleProductReducer from "../../redux/reducers/singleProduct";
import credentialReducer from "../../redux/reducers/credentialReducer";
import categoryReducer from "./../../redux/reducers/categoryReducer";

export default function createStore() {
  const store = configureStore({
    reducer: {
      productsReducer,
      cartReducer,
      singleProductReducer,
      credentialReducer,
      categoryReducer,
    },
  });

  return store;
}
