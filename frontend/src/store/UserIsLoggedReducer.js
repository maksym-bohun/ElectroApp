import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  userIsLogged: false,
};

export const signin = createAction("SIGN_IN");
export const signout = createAction("SIGN_OUT");

export default createReducer(initialState, {
  [signin]: (state) => {
    console.log("STATE, USER SIGNED IN");
    state.userIsLogged = true;
  },
  [signout]: (state) => {
    state.userIsLogged = false;
  },
});
