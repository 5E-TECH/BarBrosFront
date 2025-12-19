import { configureStore } from "@reduxjs/toolkit";
import roleSlice from "../pages/auth/store/roleSlice";
import authSlice from "../pages/login/store/tokenSlice";
import paginationSlice from "../shared/components/pagination/store/paginationSlice";
import roleReducer from "../pages/admin/users/store/roleSlice";

export const store = configureStore({
  reducer: {
    roleSlice,
    authSlice,
    paginationSlice,
    userRole: roleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
