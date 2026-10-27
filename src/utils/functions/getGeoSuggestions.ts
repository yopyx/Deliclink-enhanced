import { GeoLocationData } from "../types/fetchedData";

const getGeoSuggestions = async (searchQuery: string) => {
  const url =
    import.meta.env.VITE_ENVIRONMENT === "production"
      ? `https://deliclink.vercel.app/api/geolocation/autocomplete?q=${searchQuery}`
      : `http://localhost:3001/geolocation/autocomplete?q=${searchQuery}`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("HTTP Error!");
  }
  const { data } = await response.json();
  return data as GeoLocationData[];
};
export default getGeoSuggestions;
