import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  userSearch: string;
}

const initialState: SearchState = {
  userSearch: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setUserSearch(state, action: PayloadAction<string>) {
      state.userSearch = action.payload;
    },
  },
});

export const { setUserSearch } = searchSlice.actions;
export default searchSlice.reducer;
