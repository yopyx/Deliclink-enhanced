import { combineReducers, configureStore } from "@reduxjs/toolkit";
import geoLocationReducer from "./geoLocationsSlice";
import filterReducer from "./filterSlice";
import collectionReducer from "./collectionSlice";
import searchReducer from "./searchSlice";
import cartReducer from "./cartSlice";
import storageSession from "redux-persist/lib/storage/session";
import { persistStore, persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  geoLocation: geoLocationReducer,
  filter: filterReducer,
  collection: collectionReducer,
  search: searchReducer,
  cart: cartReducer,
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
  devTools: !import.meta.env.PROD, // DevTools enabled only in development
});

const persistor = persistStore(appStore);
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export { appStore, persistor };
