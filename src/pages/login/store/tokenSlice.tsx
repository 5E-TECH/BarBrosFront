import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IState {
  token: string | null;
}

const initialState: IState = {
  token: localStorage.getItem("x-auth-token") || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<any | null>) => {
      state.token = action.payload?.accessToken;

      if (action.payload) {
        localStorage.setItem("x-auth-token", action.payload?.accessToken);
      } else {
        localStorage.removeItem("x-auth-token");
      }
    },
    removeToken: (state) => {
      state.token = null;
      localStorage.removeItem("x-auth-token");
    },
  },
});

export const { setToken, removeToken } =
  authSlice.actions;
export default authSlice.reducer;
