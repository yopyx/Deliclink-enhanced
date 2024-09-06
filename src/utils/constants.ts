import { CityResData, RegularCardt2, RegularCardt5 } from "./types/fetchedData";

export const CORS = "https://corsproxy.io/?";
export const CITY_RES_API = (lat: string, lng: string) =>
  `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

// export const RES_CARDS_UPDATE_API =
//   "https://www.swiggy.com/dapi/restaurants/list/update";

export const RES_CARDS_UPDATE_API = (lat: string, lng: string) =>
  `https://www.swiggy.com/api/seo/getListing?lat=${lat}&lng=${lng}&isDineoutCollection=false`;
export const CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

export const MENU_API = (lat: string, lng: string, resId: string) =>
  `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${resId}&submitAction=ENTER`;

export const GEO_API = (address: string) =>
  `https://api.opencagedata.com/geocode/v1/json?q=${address
    .trim()
    .replace(/ /g, "+")}&key=${
    import.meta.env.VITE_APP_GEO_KEY
  }&language=en&no_annotations=1&pretty=1`;

export function isCityResData(data: any): data is CityResData {
  return (
    Array.isArray(data?.data.cards) &&
    data?.data?.cards[1]?.card?.card?.header !== undefined
  );
}

export function isMenuData2(data: any): data is RegularCardt2 {
  return data?.card.card.itemCards !== undefined;
}

export function isMenuData5(data: any): data is RegularCardt5 {
  return data?.card.card.categories !== undefined;
}
