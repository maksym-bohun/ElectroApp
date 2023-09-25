import { createSlice } from "@reduxjs/toolkit";

const usersReducer = createSlice({
  name: "users",
  initialState: { users: null },
  reducers: {
    setUsers: (state, payload) => {
      state.users = payload;
    },
  },
});

export const { setUsers } = usersReducer.actions;
export default usersReducer.reducer;
