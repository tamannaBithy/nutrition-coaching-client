import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./features/apiSlice";

const store = configureStore({
  reducer: {
    // Add other reducers here if needed
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

setupListeners(store.dispatch);
