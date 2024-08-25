export const CORS = "https://corsproxy.io/?";
export const CITY_RES_API = (lat: string, lng: string) =>
  `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

// export const RES_CARDS_UPDATE_API =
//   "https://www.swiggy.com/dapi/restaurants/list/update";

export const RES_CARDS_UPDATE_API = (lat: string, lng: string) =>
  `https://www.swiggy.com/api/seo/getListing?lat=${lat}&lng=${lng}&isDineoutCollection=false`;
export const CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

export const MENU_API = [
  `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=30.9006311&lng=75.923534&restaurantId=`,
  `&submitAction=ENTER`,
];

export const GEO_API = (address: string) =>
  `https://api.opencagedata.com/geocode/v1/json?q=${address
    .trim()
    .replace(/ /g, "+")}&key=${
    import.meta.env.VITE_APP_GEO_KEY
  }&language=en&no_annotations=1&pretty=1`;

export const PROFILE_ICON =
  "https://static-00.iconduck.com/assets.00/profile-default-icon-144x144-030q38zb.png";

export const RIGHT_ARROW_ICON =
  "https://static-00.iconduck.com/assets.00/arrow-right-1-icon-72x144-fo0m2d6f.png";
export const LEFT_ARROW_ICON =
  "https://static-00.iconduck.com/assets.00/arrow-left-1-icon-71x144-e2eaygf9.png";
export const FILTER_ICON =
  "https://static-00.iconduck.com/assets.00/filter-icon-144x140-jvrc9le0.png";
export const DOWN_ARROW_ICON =
  "https://static-00.iconduck.com/assets.00/arrow-down-1-icon-144x73-ywwkdgwd.png";
export const LOCATION_ICON =
  "https://static-00.iconduck.com/assets.00/location-indicator-emoji-168x256-2k5zk5m9.png";
