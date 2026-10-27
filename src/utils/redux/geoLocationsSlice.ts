import { createSlice } from "@reduxjs/toolkit";
import { GeoLocationData } from "../types/fetchedData";

const geoLocationsSlice = createSlice({
  name: "geo location",
  initialState: {
    currentLocation: {} as GeoLocationData,
  },
  reducers: {
    addLocationGeometry: (state, action) => {
      state.currentLocation = action.payload;
    },
  },
});
export const { addLocationGeometry } = geoLocationsSlice.actions;
export default geoLocationsSlice.reducer;
