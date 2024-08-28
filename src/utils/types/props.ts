import {
  Cuisine,
  FacetList,
  NextListParam,
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
