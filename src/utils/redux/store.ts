import { configureStore } from "@reduxjs/toolkit";
import geoLocationReducer from "./geoLocationsSlice";
import filterReducer from "./filterSlice";

export const appStore = configureStore({
  reducer: {
    geoLocation: geoLocationReducer,
    filter: filterReducer,
  },
});
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
