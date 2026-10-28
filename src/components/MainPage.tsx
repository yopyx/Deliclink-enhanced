import RestaurantCardsContainer from "./RestaurantCardsContainer";
import CuisinesSuggestions from "./CuisinesSuggestions";
import { useQuery } from "@tanstack/react-query";
import getCityResData from "../utils/functions/getCityResData";
import { useAppDispatch, useAppSelector } from "../utils/types/reactReduxHooks";
import { FilterState } from "../utils/types/slicesState";
import FilterBar from "./FilterBar";
import {
  isCityLinksCard,
  isCuisinesCard,
  isGridCard,
  isGridCard2,
  isMetaCard,
  isSortCard,
  isTitleCard,
} from "../utils/constants";
import { useEffect } from "react";
import { resetState } from "../utils/redux/filterSlice";
import TopRestaurants from "./TopRestaurants";
import MainPageShimmer from "./shimmer/MainPageShimmer";
import MainPageError from "./error/MainPageError";
import MainPageError2 from "./error/MainPageError2";
import { clearCart } from "../utils/redux/cartSlice";
import Cities from "./Cities";
import { useParams, useSearchParams } from "react-router";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { cityName } = useParams();
  const currentLocation = useAppSelector(
    (store) => store.geoLocation.currentLocation,
  );
  const [params] = useSearchParams();
  const [lat, lng] = [params.get("lat"), params.get("lng")];
  const { sortConfig, facets }: FilterState = useAppSelector(
    (store) => store.filter,
  );
  // const currentLocation = useMemo(() => {
  //   return (
  //     locationsList.find(
  //       (e) => e.city === location.pathname.split("/").slice(-1)[0],
  //     ) || locationsList[locationsList.length - 1]
  //   );
  // }, [locationsList, location.pathname]);
  const { data, status } = useQuery({
    queryKey: ["city data", cityName || currentLocation.city],
    queryFn: () =>
      getCityResData(
        lat || currentLocation.geometry.lat,
        lng || currentLocation.geometry.lng,
      ),
    enabled: !!((lat && lng) || currentLocation),
  });
  useEffect(() => {
    return () => {
      dispatch(resetState());
      dispatch(clearCart());
    };
  }, [dispatch, lat]);
  if (status === "pending") {
    return <MainPageShimmer />;
  }
  if (status === "error") {
    return <MainPageError />;
  }
  return data!.data?.cards?.length === 4 ? (
    <MainPageError2 />
  ) : (
    <div className="w-[85%] my-10 mx-auto mr-0 lg:mr-3.5 flex flex-col gap-y-10 overflow-x-hidden">
      {data!.data.cards.find((e) => isCuisinesCard(e)) && (
        <CuisinesSuggestions
          info={data!.data.cards.find((e) => isCuisinesCard(e))!.card.card}
          lat={lat || currentLocation.geometry.lat}
          lng={lng || currentLocation.geometry.lng}
        />
      )}
      {data!.data.cards.find((e) => isGridCard(e)) && (
        <TopRestaurants
          info={data!.data.cards.find((e) => isGridCard(e))!.card.card}
          lat={lat || currentLocation.geometry.lat}
          lng={lng || currentLocation.geometry.lng}
        />
      )}
      <div className="space-y-5">
        <h2 className="font-semibold text-xl lg:text-lg">
          {data!.data.cards.find((e) => isTitleCard(e))?.card.card.title}
        </h2>
        {data!.data.cards.find((e) => isSortCard(e)) && (
          <FilterBar
            info={data!.data.cards.find((e) => isSortCard(e))!.card.card}
            sortConfig={sortConfig}
            facet={facets}
          />
        )}
      </div>
      {data!.data?.cards.find((e) => isGridCard2(e)) && (
        <RestaurantCardsContainer
          dataList={
            data!.data?.cards.find((e) => isGridCard2(e))?.card.card
              .gridElements.infoWithStyle.restaurants || []
          }
          lat={lat || currentLocation.geometry.lat}
          lng={lng || currentLocation.geometry.lng}
          dataObj={{
            ...JSON.parse(
              data!.data.cards.find((e) => isMetaCard(e))!.card.card
                .gandalfRequest,
            ),
            sortAttribute: sortConfig.sortKey,
            facets: facets,
            isFiltered:
              JSON.stringify({ sortConfig, facets }) !==
              '{"sortConfig":{"sortTitle":"Relevance(Default)","sortKey":"relevance"},"facet":{}}',
          }}
          sortConfig={sortConfig}
          facets={facets}
        />
      )}
      {data!.data?.cards.find((e) => isCityLinksCard(e)) && (
        <Cities
          info={data!.data.cards.find((e) => isCityLinksCard(e))!.card.card}
        />
      )}
    </div>
  );
};

export default MainPage;
