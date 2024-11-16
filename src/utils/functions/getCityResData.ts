import { CityResData } from "../types/fetchedData";
import { CITY_RES_API, CORS } from "../constants";

const getCityResData = async (lat: string, lng: string) => {
  const url = `http://localhost:3001/city-res-data?lat=${lat}&lng=${lng}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data as CityResData;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
  }
};
export default getCityResData;
