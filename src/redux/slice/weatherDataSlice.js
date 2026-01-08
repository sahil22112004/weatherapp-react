import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeather = createAsyncThunk("fetchWeather",async (countryname, { rejectWithValue }) => {
    try {
      const apikey = "ced6da13ccc5fc2a4be14ee6b70420fd";
      const response = await axios.get( "https://api.openweathermap.org/data/2.5/weather",
        {
          params: { 
            q: countryname, 
            appid: apikey },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  weatherdata: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherdata = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.weatherdata = null;
      });
  },
});

export default weatherSlice.reducer;
