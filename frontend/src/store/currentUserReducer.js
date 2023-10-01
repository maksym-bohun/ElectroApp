import { createSlice } from "@reduxjs/toolkit";

const currentUserReducer = createSlice({
  name: "allUsers",
  initialState: {
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      console.log("PAYLOAD", action.payload);
      state.user = action.payload;
      console.log(
        "SET USER🦾🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️🙎‍♂️"
      );
    },
    likeProduct: (state, action) => {
      console.log("LIKE");
      console.log(state.user);
      if (state.user.likedProducts) {
        state.user.likedProducts.push(action.payload);
      }
    },
    dislikeProduct: (state, action) => {
      console.log("DISLIKE");
      console.log(state.user.likedProducts);
      if (state.user) {
        const indexInArray = state.user.likedProducts.indexOf(action.payload);
        state.user.likedProducts.splice(indexInArray, 1);
      }
    },
  },
});

export const { setUser, likeProduct, dislikeProduct } =
  currentUserReducer.actions;
export default currentUserReducer.reducer;
