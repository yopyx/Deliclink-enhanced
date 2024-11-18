import { Menu } from "../types/fetchedData";

const getMenuData = async (lat: string, lng: string, resId: string) => {
  const url =
    import.meta.env.VITE_ENVIRONMENT === "production"
      ? `https://deliclink.vercel.app/menu-data?lat=${lat}&lng=${lng}&resId=${resId}`
      : `http://localhost:3001/menu-data?lat=${lat}&lng=${lng}&resId=${resId}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data as Menu;
  } catch (error) {
    console.error("Error fetching restaurant menu:", error);
  }
};
export default getMenuData;
