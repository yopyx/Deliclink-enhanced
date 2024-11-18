import { CityResData } from "../types/fetchedData";

const getCityResData = async (lat: string, lng: string) => {
  const url =
    import.meta.env.VITE_ENVIRONMENT === "production"
      ? `https://deliclink.vercel.app/city-res-data?lat=${lat}&lng=${lng}`
      : `http://localhost:3001/city-res-data?lat=${lat}&lng=${lng}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data as CityResData;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
  }
};
export default getCityResData;
