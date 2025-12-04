import { configureStore } from "@reduxjs/toolkit";
import roleSlice from "../pages/auth/store/roleSlice";

export const store = configureStore({
    reducer:{
        roleSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
