import { GeoLocation } from "../types/fetchedData";

const getGeoSuggestions = async (address = "") => {
  const url =
    import.meta.env.VITE_ENVIRONMENT === "production"
      ? `https://deliclink.vercel.app/geo-suggest?address=${address}`
      : `http://localhost:3001/geo-suggest?address=${address}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("HTTP Error!");
  }
  const data = await response.json();
  return data.results as GeoLocation[];
};
export default getGeoSuggestions;
