import {
  CityLinksCard,
  CityResData,
  CollectionInfo,
  CollectionResData,
  CuisinesCard,
  DishResCard,
  GridResCard,
  GridResCard2,
  MetaCard,
  RegularCardt2,
  RegularCardt5,
  ResCardResult,
  ResData,
  ResData2,
  SortCard,
  TitleCard,
} from "./types/fetchedData";
import { MenuCategoriesData, MenuOffersData } from "./types/props";

export const CORS = "https://corsproxy.io/?";
export const CITY_RES_API = (lat: string, lng: string) =>
  `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
export const COLLECTION_API = (
  lat: string,
  lng: string,
  params: string,
  sortKey: string,
  facets: string
) =>
  `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&${params}${
    sortKey ? "&sortAttribute=" + sortKey : ""
  }${facets}`;
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

export const CUISINES_PRE_SEARCH_API = (lat: string, lng: string) =>
  `https://www.swiggy.com/dapi/landing/PRE_SEARCH?lat=${lat}&lng=${lng}`;

export const SUGGESTIONS_API = (lat: string, lng: string, query: string) =>
  `https://www.swiggy.com/dapi/restaurants/search/suggest?lat=${lat}&lng=${lng}&str=${query}&trackingId=undefined&includeIMItem=true`;
export const SEARCH_RESULTS_API = (
  lat: string,
  lng: string,
  query: string,
  meta: string,
  displayLabel: string,
  sortKey: string,
  facets: string
) =>
  `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${query}&trackingId=undefined&submitAction=SUGGESTION&metaData=${meta}${facets}${
    sortKey ? "&sortKey=" + sortKey : ""
  }&selectedPLTab=${displayLabel}`;

export function isCityResData(data: any): data is CityResData {
  return (
    Array.isArray(data?.data.cards) &&
    data?.data.cards.find((e) => isGridCard(e)) !== undefined
  );
}
export function isGridCard(data: any): data is GridResCard {
  return (
    data?.card?.card?.header !== undefined &&
    data?.card?.card?.gridElements?.infoWithStyle?.restaurants !== undefined
  );
}
export function isGridCard2(data: any): data is GridResCard2 {
  return (
    data?.card?.card?.gridElements?.infoWithStyle?.restaurants !== undefined &&
    data?.card?.card?.header === undefined
  );
}
export function isResData(data: any): data is ResData {
  return data?.badgesV2 !== undefined;
}
export function isResData2(data: any): data is ResData2 {
  return data?.info?.badgesV2 !== undefined;
}
export function isTitleCard(data: any): data is TitleCard {
  return data?.card?.card?.title !== undefined;
}

export function isSortCard(data: any): data is SortCard {
  return data?.card?.card?.sortConfigs !== undefined;
}

export function isMetaCard(data: any): data is MetaCard {
  return data?.card?.card?.gandalfRequest !== undefined;
}
export function isCuisinesCard(data: any): data is CuisinesCard {
  return data?.card?.card?.imageGridCards?.info !== undefined;
}

export function isCityLinksCard(data: any): data is CityLinksCard {
  return data?.card?.card?.cities !== undefined;
}

export function isMenuData2(data: any): data is RegularCardt2 {
  return data?.card.card?.itemCards !== undefined;
}

export function isMenuData5(data: any): data is RegularCardt5 {
  return data?.card.card?.categories !== undefined;
}

export function isOffersData(data: any): data is MenuOffersData {
  return data?.card?.card?.gridElements?.infoWithStyle?.offers !== undefined;
}

export function isMenuCategoriesData(data: any): data is MenuCategoriesData {
  return data?.groupedCard?.cardGroupMap?.REGULAR?.cards !== undefined;
}

export function isCollectionInfo(data: any): data is CollectionInfo {
  return (
    data?.card?.card?.title !== undefined &&
    data?.card?.card?.collectionId !== undefined
  );
}
export function isCollectionResData(data: any): data is CollectionResData {
  return isResData(data?.card?.card) || isResData2(data?.card?.card);
}

export function isResCardResult(data: any): data is ResCardResult {
  return data?.card?.card?.info !== undefined;
}
export function isDishResCard(data: any): data is DishResCard {
  return (
    data?.card?.card?.info !== undefined &&
    data?.card?.card?.restaurant !== undefined
  );
}
