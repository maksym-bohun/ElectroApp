import { createSlice } from "@reduxjs/toolkit";

const categoriesReducer = createSlice({
  name: "categories",
  initialState: {
    categories: [],
  },
  reducers: {
    setCategories: (state, payload) => {
      state.categories = payload;
    },
  },
});

export const { setCategories } = categoriesReducer.actions;
export default categoriesReducer.reducer;
