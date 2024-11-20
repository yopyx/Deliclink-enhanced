import {
  CityLinksCard,
  CuisinesCard,
  Dish,
  DishResCard,
  FacetList,
  GridResCard,
  NextListParam,
  Offer,
  RegularCardt1,
  RegularCardt2,
  RegularCardt3,
  RegularCardt4,
  RegularCardt5,
  ResCardResult,
  ResData,
  ResData2,
  SortCard,
} from "./fetchedData";
import { CartState, Facet, Sort } from "./slicesState";

export type CuisinesSectionProps = {
  info: CuisinesCard["card"]["card"];
  updateText?: (text: string) => void;
  updateSuggestionsView: (text: boolean) => void;
};

export type RestaurantCardProps = { resData: ResData | ResData2 };
export type RestaurantCardsContainerProps = {
  dataList: (ResData | ResData2)[];
  lat: string;
  lng: string;
  dataObj: NextListParam;
  sortConfig: Sort;
  facets: Facet;
};

export type FilterBarProps = {
  info: SortCard["card"]["card"];
  sortConfig: Sort;
  facet: Facet;
};

export type FilterOptionProps = {
  info: SortCard["card"]["card"];
  handleView: (arg: boolean) => void;
  sortConfig: Sort;
  facet: Facet;
  facetObj: MappedFacet;
};

export type OfferProps = {
  info: Offer["info"];
};
export type CitiesProps = {
  info: CityLinksCard["card"]["card"];
};
export type MenuCategoryProps = {
  index: string;
  category: Dish[];
  isVeg: boolean;
  isShown: boolean;
  setViewCategory: (index: string) => void;
};

export type FoodItemProps = {
  info: Dish["card"]["info"];
  checkout: boolean;
  storedItems: CartState["items"];
};

export type MenuOffersData = {
  card: {
    card: {
      "@type": string;
      layout: {
        rows: number;
        columns: number;
        horizontalScrollEnabled: boolean;
        itemSpacing: number;
        lineSpacing: number;
        widgetPadding: object;
        containerStyle: {
          containerPadding: {
            left: number;
            right: number;
            bottom: number;
          };
        };
        scrollBar: object;
      };
      id: string;
      gridElements: {
        infoWithStyle: {
          "@type": string;
          offers: Offer[];
          habitMilestoneInfo: {
            callout: object;
          };
          loyaltyDiscoverPresentationInfo: {
            logoCtx: object;
          };
        };
      };
    };
  };
};

export type MenuCategoriesData = {
  groupedCard: {
    cardGroupMap: {
      REGULAR: {
        cards: (
          | RegularCardt1
          | RegularCardt2
          | RegularCardt3
          | RegularCardt4
          | RegularCardt5
        )[];
      };
    };
  };
};

export type TopRestaurantsProps = {
  info: GridResCard["card"]["card"];
};

export type CollectionCardsContainerProps = {
  dataList: (ResData | ResData2)[];
};

export type SearchSuggestionsProps = {
  lat: string;
  lng: string;
  searchQuery: string;
  handleInputText: (text: string) => void;
  updateSuggestionsView: (text: boolean) => void;
};

export type SearchResultsProps = {
  lat: string;
  lng: string;
  query: string;
  meta: string;
  type: string;
};

export type SearchResultedResCardProps = {
  info: ResCardResult["card"]["card"]["info"];
};
export type SearchResultedDishCardProps = {
  dishData: DishResCard["card"]["card"];
  storedItems: CartState["items"];
};

export type MappedFacet = {
  [label: string]: FacetList;
};
