import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type RoleState = {
  selectedRole: "user" | "admin";
};

const initialState: RoleState = {
  selectedRole: "user",
};

const rolesSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRole(state, action: PayloadAction<"user" | "admin">) {
      state.selectedRole = action.payload;
    },
  },
});

export const { setRole } = rolesSlice.actions;
export default rolesSlice.reducer;
