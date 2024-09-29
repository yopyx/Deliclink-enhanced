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

export type FilterState = {
  sortConfig: Sort;
  facets: Facet;
};

export type CollectionState = { pathParams: string; title: string };
