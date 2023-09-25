import { createSlice } from "@reduxjs/toolkit";

const productsReducer = createSlice({
  name: "products",
  initialState: { products: [] },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProducts: (state, action) => {
      if (state !== null) {
        console.log("p_p", action.payload);
        const products = action.payload;
        products.forEach((el) => {
          let productIsInState = false;
          console.log("state", state);
          state.products.forEach((element) => {
            if (element._id === el._id) {
              productIsInState = true;
            }
          });
          if (!productIsInState) state.products.push(el);
        });
      } else return state;
    },
  },
});

export const { addProducts, setProducts } = productsReducer.actions;
export default productsReducer.reducer;
