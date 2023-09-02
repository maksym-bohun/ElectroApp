import { createSlice } from "@reduxjs/toolkit";

const currentUserReducer = createSlice({
  name: "allUsers",
  initialState: {
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = currentUserReducer.actions;
export default currentUserReducer.reducer;
