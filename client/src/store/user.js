import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../services/apiServices";

const initialState = {
  email: "",
  token: "",
  loginId: null,
  firstName: "",
  lastName: "",
};

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser',async (_, thunkAPI) => {
  try {
    const pbUser = localStorage.getItem('pbUser') ?? '';
    let token = pbUser ? JSON.parse(pbUser).token : '';
    const response = await request({
      url: "/api/user",
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }); 

    return response.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.message);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      state.email = action.payload.email,
      state.token = action.payload.token,
      state.loginId = action.payload.loginId,
      state.firstName = action.payload.firstName,
      state.lastName = action.payload.lastName,
      state.userId = action.payload.userId
    },
  },
});

