export type GeoLocationStateProp = {
  city: string;
  geometry: {
    lat: string;
    lng: string;
  };
};

export type Facet = {
  [id: string]: { value: string }[];
};
export type FilterState = {
  sortKey: string;
  facet: Facet;
};
