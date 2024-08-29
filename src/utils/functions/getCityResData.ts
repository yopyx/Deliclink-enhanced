import { CityResData, CityResDatav2 } from "../types/fetchedData";
import { CITY_RES_API, CORS } from "../constants";

const getCityResData = async (lat: string, lng: string) => {
  const url = CORS + encodeURIComponent(CITY_RES_API(lat, lng));
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data as CityResData | CityResDatav2;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
  }
};
export default getCityResData;
