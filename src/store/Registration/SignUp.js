import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:4000";

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(baseURL + "/users");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAdmins = createAsyncThunk(
  "user/getAdmins",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(baseURL + "/admins");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createAccount = createAsyncThunk(
  "user/createUser",
  async (Data, thunkAPI) => {
    try {
      if (Data.case == "user") {
        const response = await axios.post(
          baseURL + "/users/addUser",
          Data.data
        );
        return response.data;
      } else if (Data.case == "admin") {
        const response = await axios.post(
          baseURL + "/admins/addAdmin",
          Data.data
        );
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateAccount = createAsyncThunk(
  "user/updateAcount",
  async (Data, thunkAPI) => {
    try {
      if (Data.case == "user") {
        const response = await axios.put(
          baseURL + "/users/userUpdateAccount",
          Data.data
        );
        return response.data;
      } else if (Data.case == "admin") {
        const response = await axios.put(
          baseURL + "/admins/adminUpdateAccount",
          Data.data
        );
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateProfilePicture = createAsyncThunk(
  "user/updateProfilePicture",
  async (Data, thunkAPI) => {
    try {
      if (Data.case == "user") {
        const response = await axios.put(
          baseURL + "/users/userUpdateProfilePicture",
          Data.data
        );
        return response.data;
      } else if (Data.case == "admin") {
        const response = await axios.put(
          baseURL + "/admins/adminUpdateProfilePicture",
          Data.data
        );
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  users: [],
  admins: [],
  createAccount: null,
  updateAccount: null,
  updateProfilePicture: null,
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [getUsers.pending]: (state, action) => {},
    [getUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
    },
    [getUsers.rejected]: (state, action) => {},

    [getAdmins.pending]: (state, action) => {},
    [getAdmins.fulfilled]: (state, action) => {
      state.admins = action.payload;
    },
    [getAdmins.rejected]: (state, action) => {},

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

export default usersSlice.reducer;
