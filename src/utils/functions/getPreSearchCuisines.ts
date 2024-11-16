import { PreSearchCuisinesData } from "../types/fetchedData";
import { CORS, CUISINES_PRE_SEARCH_API } from "../constants";

const getPreSearchCuisines = async (lat: string, lng: string) => {
  const url = `http://localhost:3001/pre-search-cuisines?lat=${lat}&lng=${lng}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data as PreSearchCuisinesData;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
  }
};
export default getPreSearchCuisines;
