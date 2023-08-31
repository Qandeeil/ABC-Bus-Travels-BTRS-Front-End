import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://abc-bus-travels-btrs-back-end-production.up.railway.app";

export const loginAccount = createAsyncThunk("login/loginAccount", async (Data, thunkAPI) => {
  try {
    const response = await axios.post(baseURL + "/account/login", Data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const initialState = { isLogin: null, isLoading: false };

const loginSlice = createSlice({
  name: "login",
  initialState,
  extraReducers: {
    [loginAccount.pending]: (state, action) => {
      state.isLoading = true
    },
    [loginAccount.fulfilled]: (state, action) => {
      state.isLoading = false
      state.isLogin = action.payload;
    },
    [loginAccount.rejected]: (state, action) => {
      state.isLoading = false
    },
  },
});

export default loginSlice.reducer;
