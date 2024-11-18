import { PreSearchCuisinesData } from "../types/fetchedData";

const getPreSearchCuisines = async (lat: string, lng: string) => {
  const url =
    import.meta.env.VITE_ENVIRONMENT === "production"
      ? `https://deliclink.vercel.app/pre-search-cuisines?lat=${lat}&lng=${lng}`
      : `http://localhost:3001/pre-search-cuisines?lat=${lat}&lng=${lng}`;
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    return data as PreSearchCuisinesData;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
  }
};
export default getPreSearchCuisines;
