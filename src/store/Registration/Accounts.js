import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://abc-bus-travels-btrs-back-end-production.up.railway.app";

export const getAccounts = createAsyncThunk(
  "account/getAccounts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(baseURL + "/account");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
    accounts: [],
  };
  
  const accountSlice = createSlice({
    name: "account",
    initialState,
    extraReducers: {
      [getAccounts.pending]: (state, action) => {},
      [getAccounts.fulfilled]: (state, action) => {
        state.accounts = action.payload;
      },
      [getAccounts.rejected]: (state, action) => {},
    },
  });
  
  export default accountSlice.reducer;
