import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:4000";

export const loginAccount = createAsyncThunk("login/loginAccount", async (Data, thunkAPI) => {
  try {
    const response = await axios.post(baseURL + "/account/login", Data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const initialState = { isLogin: null };

const loginSlice = createSlice({
  name: "login",
  initialState,
  extraReducers: {
    [loginAccount.pending]: (state, action) => {},
    [loginAccount.fulfilled]: (state, action) => {
      state.isLogin = action.payload;
    },
    [loginAccount.rejected]: (state, action) => {},
  },
});

export default loginSlice.reducer;
