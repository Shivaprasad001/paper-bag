import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
}

export const authSlice = createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        }
    }
})