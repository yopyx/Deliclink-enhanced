import { createSlice } from "@reduxjs/toolkit";
import { FilterState } from "../types/slicesState";

const filterSlice = createSlice({
  name: "filter",
  initialState: { sortKey: "relevance", facet: {} },
  reducers: {
    addSortKey: (state: FilterState, action) => {
      state.sortKey = action.payload;
    },
    addFacet: (state: FilterState, action) => {
      const [id1, id2] = action.payload;
      if (state.facet[id1]) {
        state.facet[id1].push({ value: id2 });
      } else {
        state.facet[id1] = [{ value: id2 }];
      }
    },
    removeFacet: (state: FilterState, action) => {
      const [id1, id2] = action.payload;
      if (state.facet[id1].length === 1) {
        delete state.facet[id1];
      } else {
        const index = state.facet[id1].findIndex((f) => f.value === id2);
        state.facet[id1].splice(index, 1);
      }
    },
  },
});
export const { addSortKey, addFacet, removeFacet } = filterSlice.actions;
export default filterSlice.reducer;
