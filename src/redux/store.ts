import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import productReducer from "./reducers/productsReducer";
import cartReducer from "./reducers/cartReducer";
import singleProductReducer from "./reducers/singleProduct";
import credentialReducer from "./reducers/credentialReducer";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import categoryReducer from "./reducers/categoryReducer";
import orderReducer from "./reducers/orderReducer";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    "productReducer",
    "singleProductReducer",
    "categoryReducer",
    " orderReducer",
  ],
};

const rootReducer = combineReducers({
  productReducer,
  singleProductReducer,
  cartReducer,
  credentialReducer,
  categoryReducer,
  orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
