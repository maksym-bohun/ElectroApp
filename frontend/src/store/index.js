import {
  combineReducers,
  configureStore,
  applyMiddleware,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import productsReducer from "./ProductsReducer";
import userIsLoggedReducer from "./UserIsLoggedReducer";
import currentUserReducer from "./currentUserReducer";
import categoriesReducer from "./СategoriesReducer";
import usersReducer from "./UsersReducer";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

export const store = configureStore(
  {
    reducer: {
      productsReducer,
      userIsLoggedReducer,
      currentUserReducer,
      categoriesReducer,
      usersReducer,
    },
  },
  composedEnhancer
);
