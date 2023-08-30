import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Trip } from "../../interfaces/global";

const baseURL = "http://localhost:4000";

export const getTrips = createAsyncThunk(
  "trip/getTrips",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(baseURL + "/trips");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

export const newTrip = createAsyncThunk(
  "trip/newTrip",
  async (formData: Trip, thunkAPI) => {
    try {
      const response = await axios.post(baseURL + "/trips/newTrip", formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

export const deleteTrip = createAsyncThunk(
  "trip/deleteTrip",
  async (_id: any, thunkAPI) => {
    try {
      const response = await axios.delete(baseURL + "/trips/deleteTrip", { data: { _id } });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

interface TripState {
  trips: Trip[];
  newTrip: Trip | null | any;
  deleteTrip: any
}

const initialState: TripState = { trips: [], newTrip: {result: false}, deleteTrip: {result: false} };

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    resetTripFlags: (state) => {
      state.newTrip.result = false;
      state.deleteTrip.result = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrips.pending, (state) => {})
      .addCase(getTrips.fulfilled, (state, action) => {
        state.trips = action.payload;
      })
      .addCase(getTrips.rejected, (state) => {})
      .addCase(newTrip.pending, (state) => {})
      .addCase(newTrip.fulfilled, (state, action) => {
        state.newTrip = action.payload;
      })
      .addCase(newTrip.rejected, (state) => {})
      .addCase(deleteTrip.pending, (state) => {})
      .addCase(deleteTrip.fulfilled, (state, action) => {
        state.deleteTrip = action.payload;
      })
      .addCase(deleteTrip.rejected, (state) => {})
  },
});

export const { resetTripFlags } = tripSlice.actions;
export default tripSlice.reducer;
