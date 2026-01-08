import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./slice/weatherDataSlice.js";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});
