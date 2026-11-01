import { SearchSuggestions } from "../types/fetchedData";

const getSearchSuggestions = async (
  lat: string,
  lng: string,
  query: string,
) => {
  const url =
    import.meta.env.VITE_ENVIRONMENT === "production"
      ? `${import.meta.env.VITE_BACKEND_URL}/search/suggest?lat=${lat}&lng=${lng}&q=${query}`
      : `http://localhost:3001/search/suggest?lat=${lat}&lng=${lng}&q=${query}`;
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });
    const { data } = await response.json();
    return data as SearchSuggestions;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
  }
};
export default getSearchSuggestions;
