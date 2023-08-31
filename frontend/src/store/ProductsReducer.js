import { createAction, createReducer } from "@reduxjs/toolkit";
import { DUMMY_PRODUCTS } from "../data/data";

const initialState = {
  products: DUMMY_PRODUCTS,
};

export const addAdvertisment = createAction("ADD_ADVERTISMENT");

export default createReducer(initialState, {
  [addAdvertisment]: (state, action) => {
    // state.products

    // state.products.push(action.payload);

    const category = action.payload.category;
    state.products[category].push(action.payload);
  },
});
