import { CORS, MENU_API } from "../constants";
import { Menu } from "../types/fetchedData";

const getMenuData = async (lat: string, lng: string, resId: string) => {
  const url = CORS + encodeURIComponent(MENU_API(lat, lng, resId));
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data as Menu;
  } catch (error) {
    console.error("Error fetching restaurant menu:", error);
  }
};
export default getMenuData;
