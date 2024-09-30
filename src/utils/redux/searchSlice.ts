import { createSlice } from "@reduxjs/toolkit";
import { SearchState } from "../types/slicesState";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchQuery: "",
    history: {},
    selectedSuggestion: {},
  } as SearchState,
  reducers: {
    addSearchQuery: (state: SearchState, action) => {
      state.searchQuery = action.payload;
    },
    addSearchSuggestions: (state: SearchState, action) => {
      const [query, suggestions] = action.payload;
      state.history[query] = suggestions;
    },
    addSelectedSuggestion: (state: SearchState, action) => {
      state.selectedSuggestion = action.payload;
    },
  },
});
export const { addSearchQuery, addSearchSuggestions, addSelectedSuggestion } =
  searchSlice.actions;
export default searchSlice.reducer;
