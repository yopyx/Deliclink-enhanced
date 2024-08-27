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
  facet: Facet;
};
