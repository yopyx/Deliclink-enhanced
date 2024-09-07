import {
  Cuisine,
  Dish,
  FacetList,
  NextListParam,
  Offer,
  RegularCardt1,
  RegularCardt2,
  RegularCardt3,
  RegularCardt4,
  RegularCardt5,
  ResData,
  SortConfig,
} from "./fetchedData";
import { Facet, Sort } from "./slicesState";

export type CuisinesSectionProps = {
  info: {
    "@type": string;
    header: {
      title: string;
      headerStyling: {
        padding: {
          left: number;
          top: number;
          bottom: number;
        };
      };
    };
    layout: {
      rows: number;
      columns: number;
      horizontalScrollEnabled: boolean;
      itemSpacing: number;
      widgetPadding: object;
      containerStyle: {
        containerPadding: {
          left: number;
          top: number;
          right: number;
          bottom: number;
        };
      };
      scrollBar: object;
      widgetTheme: {
        defaultMode: {
          backgroundColour: string;
          theme: string;
        };
        darkMode: {
          theme: string;
        };
      };
    };
    imageGridCards: {
      info: Cuisine[];
      style: {
        width: {
          type: string;
          value: number;
          reference: string;
        };
        height: {
          type: string;
          value: number;
          reference: string;
        };
      };
    };
  };
};

export type RestaurantCardProps = { resData: ResData };
export type RestaurantCardsContainerProps = {
  dataList: ResData[];
  lat: string;
  lng: string;
  dataObj: NextListParam;
};

export type FilterBarProps = {
  info: {
    "@type": string;
    sortConfigs: {
      key: string;
      title: string;
      selected?: boolean;
      defaultSelection?: boolean;
    }[];
    restaurantCount: number;
    facetList: FacetList[];
  };
  sortConfig: Sort;
  facet: Facet;
};

export type FilterOptionProps = {
  info: {
    "@type": string;
    sortConfigs: SortConfig[];
    restaurantCount?: number;
    facetList: FacetList[];
  };
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
