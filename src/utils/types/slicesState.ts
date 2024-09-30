import { SuggestionCard } from "./fetchedData";

export type GeoLocationStateProp = {
  city: string;
  geometry: {
    lat: string;
    lng: string;
  };
};

export type Sort = { sortTitle: string; sortKey: string };
export type Facet = {
  [id: string]: { value: string }[];
};
export type FacetInDetail = {
  [id: string]: { id: string; operator: string; label: string }[];
};
export type FilterState = {
  sortConfig: Sort;
  facets: Facet;
  facetsInDetail: FacetInDetail;
};

export type CollectionState = { pathParams: string; title: string };

export type SearchState = {
  searchQuery: string;
  history: { [id: string]: SuggestionCard[] };
  selectedSuggestion: {
    query: string;
    meta: string;
    type: string;
  };
};
