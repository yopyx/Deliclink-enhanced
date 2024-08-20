import { configureStore } from "@reduxjs/toolkit";
import geoLocationReducer from "./geoLocationsSlice";

export const appStore = configureStore({
  reducer: {
    geoLocation: geoLocationReducer,
  },
});
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
