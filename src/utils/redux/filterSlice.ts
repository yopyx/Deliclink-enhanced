import { createSlice } from "@reduxjs/toolkit";
import { FilterState } from "../types/slicesState";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    sortConfig: { sortTitle: "Relevance(Default)", sortKey: "relevance" },
    facet: {},
  },
  reducers: {
    addSortConfig: (state: FilterState, action) => {
      state.sortConfig = action.payload;
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
    resetState: (state: FilterState) => {
      state.sortConfig = {
        sortTitle: "Relevance(Default)",
        sortKey: "relevance",
      };
      state.facet = {};
    },
  },
});
export const { addSortConfig, addFacet, removeFacet, resetState } =
  filterSlice.actions;
export default filterSlice.reducer;
