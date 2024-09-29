import { configureStore } from "@reduxjs/toolkit";
import geoLocationReducer from "./geoLocationsSlice";
import filterReducer from "./filterSlice";
import collectionReducer from "./collectionSlice";

export const appStore = configureStore({
  reducer: {
    geoLocation: geoLocationReducer,
    filter: filterReducer,
    collection: collectionReducer,
  },
});
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
