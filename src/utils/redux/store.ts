import { combineReducers, configureStore } from "@reduxjs/toolkit";
import geoLocationReducer from "./geoLocationsSlice";
import filterReducer from "./filterSlice";
import collectionReducer from "./collectionSlice";
import storageSession from "redux-persist/lib/storage/session";
import { persistStore, persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  geoLocation: geoLocationReducer,
  filter: filterReducer,
  collection: collectionReducer,
});
const persistConfig = {
  key: "root",
  storage: storageSession,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const appStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(appStore);
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export { appStore, persistor };
