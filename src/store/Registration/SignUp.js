import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://abc-bus-travels-btrs-back-end-production.up.railway.app";


export const createAccount = createAsyncThunk(
  "signup/createAccount",
  async (Data, thunkAPI) => {
    try {
      const response = await axios.post(baseURL + "/account/createAccount", Data.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateAccount = createAsyncThunk(
  "signup/updateAccount",
  async (Data, thunkAPI) => {
    try {
      const response = await axios.put(
        baseURL + "/account/updateAccount",
        Data.data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateProfilePicture = createAsyncThunk(
  "signup/updateProfilePicture",
  async (Data, thunkAPI) => {
    try {
      const response = await axios.put(
        baseURL + "/account/updateProfilePicture",
        Data.data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  createAccount: null,
  updateAccount: null,
  updateProfilePicture: null,
};

const singupSlice = createSlice({
  name: "signup",
  initialState,
  extraReducers: {
    [createAccount.pending]: (state, action) => {},
    [createAccount.fulfilled]: (state, action) => {
      state.createAccount = action.payload;
    },
    [createAccount.rejected]: (state, action) => {},

    [updateAccount.pending]: (state, action) => {},
    [updateAccount.fulfilled]: (state, action) => {
      state.updateAccount = action.payload;
    },
    [updateAccount.rejected]: (state, action) => {},

    [updateProfilePicture.pending]: (state, action) => {},
    [updateProfilePicture.fulfilled]: (state, action) => {
      state.updateProfilePicture = action.payload;
    },
    [updateProfilePicture.rejected]: (state, action) => {},
  },
});

export default singupSlice.reducer;
