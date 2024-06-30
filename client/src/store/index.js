import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from './user';
import { authSlice } from "./auth";

const store = configureStore({
    reducer: { user: userSlice.reducer, auth: authSlice.reducer }
});

export const userActions = userSlice.actions;
export const authActions = authSlice.actions;

export default store;