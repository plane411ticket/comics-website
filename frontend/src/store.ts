import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./types/user/userSlice";

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

import storage from "redux-persist/lib/storage"; // sử dụng localStorage

// Cấu hình redux-persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user"], // chỉ persist reducer "user"
};

const persistedReducer = persistReducer(persistConfig, userReducer);

// Tạo store
export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // fix warning redux-persist không serialize
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Tạo persistor
export const persistor = persistStore(store);

// Type hỗ trợ cho TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
