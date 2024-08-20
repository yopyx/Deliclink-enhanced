import { createSlice } from "@reduxjs/toolkit";
import { GeoLocationStateProp } from "../types/slicesState";

const geoLocationsSlice = createSlice({
  name: "geo location",
  initialState: {
    currentLocation: {},
  },
  reducers: {
    addLocationGeometry: (state, action) => {
      state.currentLocation = action.payload as GeoLocationStateProp;
    },
  },
});
export const { addLocationGeometry } = geoLocationsSlice.actions;
export default geoLocationsSlice.reducer;
