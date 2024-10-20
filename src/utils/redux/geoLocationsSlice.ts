import { createSlice } from "@reduxjs/toolkit";
import { GeoLocationState, GeoLocationStateProp } from "../types/slicesState";

const geoLocationsSlice = createSlice({
  name: "geo location",
  initialState: {
    currentLocation: {},
    searchLocation: "",
  } as GeoLocationState,
  reducers: {
    addLocationGeometry: (state: GeoLocationState, action) => {
      state.currentLocation = action.payload as GeoLocationStateProp;
    },
    addCity: (state: GeoLocationState, action) => {
      state.searchLocation = action.payload;
    },
  },
});
export const { addLocationGeometry, addCity } = geoLocationsSlice.actions;
export default geoLocationsSlice.reducer;
