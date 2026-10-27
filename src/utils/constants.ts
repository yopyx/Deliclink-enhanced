import {
  CityLinksCard,
  CityResData,
  CollectionInfo,
  CollectionResData,
  CuisinesCard,
  DishResCard2,
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
  facets: string,
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
  facets: string,
) =>
  `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${query}&trackingId=undefined&submitAction=SUGGESTION&metaData=${meta}${facets}${
    sortKey ? "&sortKey=" + sortKey : ""
  }&selectedPLTab=${displayLabel}`;

export function isCityResData(data: unknown): data is CityResData {
  const d = data as { data?: { cards?: unknown[] } };
  return (
    Array.isArray(d?.data?.cards) &&
    d.data!.cards!.find((e) => isGridCard(e)) !== undefined
  );
}

export function isGridCard(data: unknown): data is GridResCard {
  const d = data as {
    card?: {
      card?: {
        header?: unknown;
        gridElements?: { infoWithStyle?: { restaurants?: unknown } };
      };
    };
  };
  return (
    d?.card?.card?.header !== undefined &&
    d?.card?.card?.gridElements?.infoWithStyle?.restaurants !== undefined
  );
}

export function isGridCard2(data: unknown): data is GridResCard2 {
  const d = data as {
    card?: {
      card?: {
        gridElements?: { infoWithStyle?: { restaurants?: unknown } };
        header?: unknown;
      };
    };
  };
  return (
    d?.card?.card?.gridElements?.infoWithStyle?.restaurants !== undefined &&
    d?.card?.card?.header === undefined
  );
}

export function isResData(data: unknown): data is ResData {
  const d = data as { badgesV2?: unknown };
  return d?.badgesV2 !== undefined;
}

export function isResData2(data: unknown): data is ResData2 {
  const d = data as { info?: { badgesV2?: unknown } };
  return d?.info?.badgesV2 !== undefined;
}

export function isTitleCard(data: unknown): data is TitleCard {
  const d = data as { card?: { card?: { title?: unknown } } };
  return d?.card?.card?.title !== undefined;
}

export function isSortCard(data: unknown): data is SortCard {
  const d = data as { card?: { card?: { sortConfigs?: unknown } } };
  return d?.card?.card?.sortConfigs !== undefined;
}

export function isMetaCard(data: unknown): data is MetaCard {
  const d = data as { card?: { card?: { gandalfRequest?: unknown } } };
  return d?.card?.card?.gandalfRequest !== undefined;
}

export function isCuisinesCard(data: unknown): data is CuisinesCard {
  const d = data as {
    card?: { card?: { imageGridCards?: { info?: unknown } } };
  };
  return d?.card?.card?.imageGridCards?.info !== undefined;
}

export function isCityLinksCard(data: unknown): data is CityLinksCard {
  const d = data as { card?: { card?: { cities?: unknown } } };
  return d?.card?.card?.cities !== undefined;
}

export function isMenuData2(data: unknown): data is RegularCardt2 {
  const d = data as { card?: { card?: { itemCards?: unknown } } };
  return d?.card?.card?.itemCards !== undefined;
}

export function isMenuData5(data: unknown): data is RegularCardt5 {
  const d = data as { card?: { card?: { categories?: unknown } } };
  return d?.card?.card?.categories !== undefined;
}

export function isOffersData(data: unknown): data is MenuOffersData {
  const d = data as {
    card?: {
      card?: { gridElements?: { infoWithStyle?: { offers?: unknown } } };
    };
  };
  return d?.card?.card?.gridElements?.infoWithStyle?.offers !== undefined;
}

export function isMenuCategoriesData(
  data: unknown,
): data is MenuCategoriesData {
  const d = data as {
    groupedCard?: { cardGroupMap?: { REGULAR?: { cards?: unknown } } };
  };
  return d?.groupedCard?.cardGroupMap?.REGULAR?.cards !== undefined;
}

export function isCollectionInfo(data: unknown): data is CollectionInfo {
  const d = data as {
    card?: { card?: { title?: unknown; collectionId?: unknown } };
  };
  return (
    d?.card?.card?.title !== undefined &&
    d?.card?.card?.collectionId !== undefined
  );
}

export function isCollectionResData(data: unknown): data is CollectionResData {
  const d = data as { card?: { card?: unknown } };
  return isResData(d?.card?.card) || isResData2(d?.card?.card);
}

export function isResCardResult(data: unknown): data is ResCardResult {
  const d = data as { card?: { card?: { info?: unknown } } };
  return d?.card?.card?.info !== undefined;
}

export function isDishResCard(data: unknown): data is DishResCard2 {
  const d = data as {
    card?: { card?: { dishes?: unknown; restaurant?: unknown } };
  };
  return (
    d?.card?.card?.dishes !== undefined &&
    d?.card?.card?.restaurant !== undefined
  );
}
