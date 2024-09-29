import { createSlice } from "@reduxjs/toolkit";
import { CollectionState } from "../types/slicesState";

const collectionSlice = createSlice({
  name: "collection",
  initialState: { pathParams: "", title: "" },
  reducers: {
    addParams: (state: CollectionState, action) => {
      state.pathParams = action.payload;
    },
    addTitle: (state: CollectionState, action) => {
      state.title = action.payload;
    },
  },
});
export const { addParams, addTitle } = collectionSlice.actions;
export default collectionSlice.reducer;
