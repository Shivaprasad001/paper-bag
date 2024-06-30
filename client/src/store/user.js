import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  token: "",
  loginId: null,
  firstName: "",
  lastName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
        console.log('Update User workeddd');
      state.email = action.payload.email,
      state.token = action.payload.token,
      state.loginId = action.payload.loginId,
      state.firstName = 'Harry',
      state.lastName = 'Potter'
    },
  },
});
