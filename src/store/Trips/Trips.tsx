import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Trip } from "../../interfaces/global";

const baseURL = "https://abc-bus-travels-btrs-back-end-production.up.railway.app";

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
  async (formData: any, thunkAPI) => {
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
      const response = await axios.delete(baseURL + "/trips/deleteTrip", {
        data: { _id },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

export const updateTrip = createAsyncThunk(
  "trip/updateTrip",
  async (Data: any, thunkAPI) => {
    try {
      const response = await axios.put(baseURL + "/trips/updateTrip", Data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

export const addUserFromTrip = createAsyncThunk(
  "trip/addUserFromTrip",
  async (Data: any, thunkAPI) => {
    try {
      const response = await axios.put(
        baseURL + "/trips/addUserFromTrip",
        Data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

export const removeUserFromTrip = createAsyncThunk(
  "trip/removeUserFromTrip",
  async (Data: any, thunkAPI) => {
    try {
      const response = await axios.put(
        baseURL + "/trips/removeUserFromTrip",
        Data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

interface TripState {
  trips: Trip[];
  newTrip: Trip | null | any;
  deleteTrip: any;
  updateTrip: any;
  addUserFromTrip: any;
  removeUserFromTrip: any;
  resultSearch: any;
}

const initialState: TripState = {
  trips: [],
  newTrip: { result: false },
  deleteTrip: { result: false },
  updateTrip: { result: false },
  addUserFromTrip: { result: false },
  removeUserFromTrip: { result: false },
  resultSearch: [],
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    resetTripFlags: (state) => {
      state.newTrip.result = false;
      state.deleteTrip.result = false;
      state.updateTrip.result = false;
      state.addUserFromTrip.result = false;
      state.removeUserFromTrip.result = false;
    },
    search: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.resultSearch = state.trips.filter((trip) => {
        return (
          trip.tripDestination.toLowerCase().includes(searchTerm) ||
          trip.flightSupervisor.toLowerCase().includes(searchTerm)
        );
      });
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
      .addCase(updateTrip.pending, (state) => {})
      .addCase(updateTrip.fulfilled, (state, action) => {
        state.updateTrip = action.payload;
      })
      .addCase(updateTrip.rejected, (state) => {})
      .addCase(addUserFromTrip.pending, (state) => {})
      .addCase(addUserFromTrip.fulfilled, (state, action) => {
        state.addUserFromTrip = action.payload;
      })
      .addCase(addUserFromTrip.rejected, (state) => {})
      .addCase(removeUserFromTrip.pending, (state) => {})
      .addCase(removeUserFromTrip.fulfilled, (state, action) => {
        state.removeUserFromTrip = action.payload;
      })
      .addCase(removeUserFromTrip.rejected, (state) => {});
  },
});

export const { resetTripFlags, search } = tripSlice.actions;
export default tripSlice.reducer;
