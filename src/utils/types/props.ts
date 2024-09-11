import {
  CuisinesCard,
  Dish,
  GridResCard,
  NextListParam,
  Offer,
  RegularCardt1,
  RegularCardt2,
  RegularCardt3,
  RegularCardt4,
  RegularCardt5,
  ResData,
  ResData2,
  SortCard,
} from "./fetchedData";
import { Facet, Sort } from "./slicesState";

export type CuisinesSectionProps = {
  info: CuisinesCard["card"]["card"];
};

export type RestaurantCardProps = { resData: ResData | ResData2 };
export type RestaurantCardsContainerProps = {
  dataList: (ResData | ResData2)[];
  lat: string;
  lng: string;
  dataObj: NextListParam;
  sortConfig: Sort;
  facet: Facet;
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
};

export type OfferProps = {
  info: {
    header: string;
    offerTagColor: string;
    offerTag?: string;
    logoBottom?: string;
    offerIds: string[];
    expiryTime: string;
    couponCode?: string;
    description: string;
    offerType: string;
    restId: string;
    offerLogo: string;
    descriptionTextColor: string;
    showExpiryTimer?: boolean;
  };
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
