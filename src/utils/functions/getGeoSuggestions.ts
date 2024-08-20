import { CORS, GEO_API } from "../constants";
import { GeoLocation } from "../types/fetchedData";

const getGeoSuggestions = async (address = "") => {
  const url = CORS + encodeURIComponent(GEO_API(address));
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("HTTP Error!");
  }
  const data = await response.json();
  return data.results as GeoLocation[];
};
export default getGeoSuggestions;
