export type GeoLocation = {
  bounds: {
    northeast: {
      lat: number;
      lng: number;
    };
    southwest: {
      lat: number;
      lng: number;
    };
  };
  components: {
    "ISO_3166-1_alpha-2": string;
    "ISO_3166-1_alpha-3": string;
    "ISO_3166-2": string[];
    _category: string;
    _normalized_city: string;
    _type: string;
    attraction?: string;
    city: string;
    city_block: string;
    continent: string;
    country: string;
    country_code: string;
    county?: string;
    house_number?: string;
    local_authority?: string;
    municipality?: string;
    political_union?: string;
    postcode?: string;
    region?: string;
    road?: string;
    state: string;
    state_code: string;
    suburb?: string;
  };
  confidence: number;
  formatted: string;
  geometry: {
    lat: number;
    lng: number;
  };
};
