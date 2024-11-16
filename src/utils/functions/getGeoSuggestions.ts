import { CORS, GEO_API } from "../constants";
import { GeoLocation } from "../types/fetchedData";

const getGeoSuggestions = async (address = "") => {
  const url = `http://localhost:3001/geo-suggest?address=${address}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("HTTP Error!");
  }
  const data = await response.json();
  return data.results as GeoLocation[];
};
export default getGeoSuggestions;
