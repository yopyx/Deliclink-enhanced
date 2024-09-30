import { createSlice } from "@reduxjs/toolkit";
import { FilterState } from "../types/slicesState";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    sortConfig: { sortTitle: "Relevance(Default)", sortKey: "relevance" },
    facets: {},
    facetsInDetail: {},
  },
  reducers: {
    addSortConfig: (state: FilterState, action) => {
      state.sortConfig = action.payload;
    },
    addFacet: (state: FilterState, action) => {
      const [id1, id2] = action.payload;
      if (state.facets[id1]) {
        state.facets[id1].push({ value: id2.id });
        state.facetsInDetail[id1].push({
          id: id2.id,
          label: id2.label,
          operator: id2.operator,
        });
      } else {
        state.facets[id1] = [{ value: id2.id }];
        state.facetsInDetail[id1] = [
          { id: id2.id, label: id2.label, operator: id2.operator },
        ];
      }
    },
    removeFacet: (state: FilterState, action) => {
      const [id1, id2] = action.payload;
      if (state.facets[id1].length === 1) {
        delete state.facets[id1];
        delete state.facetsInDetail[id1];
      } else {
        const index = state.facets[id1].findIndex((f) => f.value === id2);
        state.facets[id1].splice(index, 1);
        state.facetsInDetail[id1].splice(index, 1);
      }
    },
    resetState: (state: FilterState) => {
      state.sortConfig = {
        sortTitle: "Relevance(Default)",
        sortKey: "relevance",
      };
      state.facets = {};
      state.facetsInDetail = {};
    },
  },
});
export const { addSortConfig, addFacet, removeFacet, resetState } =
  filterSlice.actions;
export default filterSlice.reducer;
