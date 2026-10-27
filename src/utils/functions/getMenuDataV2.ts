import { SearchResults } from "../types/fetchedData";

const getMenuDataV2 = async (lat: string, lng: string, query: string) => {
  const url =
    import.meta.env.VITE_ENVIRONMENT === "production"
      ? `https://deliclink.vercel.app/api/search/menu?lat=${lat}&lng=${lng}&q=${query}`
      : `http://localhost:3001/search/menu?lat=${lat}&lng=${lng}&q=${query}`;
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });
    const { data } = await response.json();
    return data as SearchResults;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
  }
};
export default getMenuDataV2;
