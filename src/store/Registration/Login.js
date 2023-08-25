import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:4000";

export const loginUser = createAsyncThunk("login/loginUser", async (Data, thunkAPI) => {
  try {
    const response = await axios.post(baseURL + "/users/loginUser", Data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const loginAdmin = createAsyncThunk("login/loginAdmin", async (Data, thunkAPI) => {
  try {
    const response = await axios.post(baseURL + "/admins/loginAdmin", Data);
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
    [loginUser.pending]: (state, action) => {},
    [loginUser.fulfilled]: (state, action) => {
      state.isLogin = action.payload;
    },
    [loginUser.rejected]: (state, action) => {},

    [loginAdmin.pending]: (state, action) => {},
    [loginAdmin.fulfilled]: (state, action) => {
      state.isLogin = action.payload;
    },
    [loginAdmin.rejected]: (state, action) => {},
  },
});

export default loginSlice.reducer;
