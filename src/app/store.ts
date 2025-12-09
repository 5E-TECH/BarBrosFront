import { configureStore } from "@reduxjs/toolkit";
import roleSlice from "../pages/auth/store/roleSlice";
import  authSlice  from "../pages/login/store/tokenSlice";

export const store = configureStore({
    reducer:{
        roleSlice,
        authSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
