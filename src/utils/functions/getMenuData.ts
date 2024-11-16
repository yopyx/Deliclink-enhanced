import { CORS, MENU_API } from "../constants";
import { Menu } from "../types/fetchedData";

const getMenuData = async (lat: string, lng: string, resId: string) => {
  const url = `http://localhost:3001/menu-data?lat=${lat}&lng=${lng}&resId=${resId}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data as Menu;
  } catch (error) {
    console.error("Error fetching restaurant menu:", error);
  }
};
export default getMenuData;
