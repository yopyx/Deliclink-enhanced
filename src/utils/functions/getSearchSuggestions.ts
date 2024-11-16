import { CORS, SUGGESTIONS_API } from "../constants";
import { SearchSuggestions } from "../types/fetchedData";

const getSearchSuggestions = async (
  lat: string,
  lng: string,
  query: string
) => {
  const url = `http://localhost:3001/search-suggest?lat=${lat}&lng=${lng}&query=${query}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data as SearchSuggestions;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
  }
};
export default getSearchSuggestions;
