import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import groupReducer from "../slices/groupSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    groups: groupReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
