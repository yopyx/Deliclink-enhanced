import { createSlice } from "@reduxjs/toolkit";
import { GeoLocationState } from "../types/slicesState";

const geoLocationsSlice = createSlice({
  name: "geo location",
  initialState: {
    currentLocations: [],
  } as GeoLocationState,
  reducers: {
    addLocationGeometry: (state: GeoLocationState, action) => {
      state.currentLocations.push(action.payload);
    },
  },
});
export const { addLocationGeometry } = geoLocationsSlice.actions;
export default geoLocationsSlice.reducer;
