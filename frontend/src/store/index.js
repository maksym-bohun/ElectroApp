import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ProductsReducer from "./ProductsReducer";
import userIsLoggedReducer from "./UserIsLoggedReducer";
import currentUserReducer from "./currentUserReducer";

export const store = configureStore({
  reducer: { ProductsReducer, userIsLoggedReducer, currentUserReducer },
});
