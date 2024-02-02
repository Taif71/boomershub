"use client";

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { foldersApi } from "./features/apis/foldersapi";
import { filesApi } from "./features/apis/filesapi";
import { authApi } from "./features/auth-api";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [foldersApi.reducerPath]: foldersApi.reducer,
    [filesApi.reducerPath]: filesApi.reducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      foldersApi.middleware,
      filesApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
setupListeners(store.dispatch);
