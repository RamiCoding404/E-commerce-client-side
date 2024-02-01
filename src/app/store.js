import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./features/LoginSlice";
import CartSlice from "./features/CartSlice";
import globalSlice from "./features/globalSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { productsApiSlice } from "./services/products";
import networkSlice from "./features/networkSlice";

const persistCartConfig = {
  key: "cart",
  storage,
};

const persistedCart = persistReducer(persistCartConfig, CartSlice);

export const store = configureStore({
  reducer: {
    network: networkSlice,
    login: LoginSlice,
    cart: persistedCart,
    global: globalSlice,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([productsApiSlice.middleware]),
});

export const persister = persistStore(store);
