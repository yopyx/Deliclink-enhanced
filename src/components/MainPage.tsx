import RestaurantCard from "./RestaurantCard";
import RestaurantCardsContainer from "./RestaurantCardsContainer";

import CuisinesSuggestions from "./CuisinesSuggestions";
import { useQuery } from "@tanstack/react-query";
import getCityResData from "../utils/functions/getCityResData";
import { useAppDispatch, useAppSelector } from "../utils/types/reactReduxHooks";
import { FilterState, GeoLocationStateProp } from "../utils/types/slicesState";
import FilterBar from "./FilterBar";
import { Link } from "react-router-dom";
import { isCityResData } from "../utils/constants";
import { useEffect } from "react";
import { resetState } from "../utils/redux/filterSlice";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { city, geometry } = useAppSelector(
    (store) => store.geoLocation.currentLocation
  ) as GeoLocationStateProp;
  const { sortConfig, facet }: FilterState = useAppSelector(
    (store) => store.filter
  );
  const { data, status, error } = useQuery({
    queryKey: ["city data", geometry.lat],
    queryFn: () => getCityResData(geometry.lat, geometry.lng),
  });
  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch, geometry.lat]);
  if (status === "pending") {
    return <div>loading...</div>;
  }
  if (status === "error") {
    return <div>{JSON.stringify(error)}</div>;
  }
  return (
    <div className="w-[85%] my-10 mx-auto mr-0 flex flex-col space-y-10 overflow-x-hidden">
      {isCityResData(data) && (
        <CuisinesSuggestions info={data.data.cards[0].card.card} />
      )}
      <div className="flex flex-col w-[85%] overflow-x-hidden border-b-2 border-stone-300 pb-10">
        <div className="flex justify-between">
          <h2 className="font-semibold text-xl">
            {isCityResData(data)
              ? data.data.cards[1].card.card.header.title
              : data!.data.cards[0].card.card.title}
          </h2>
          <div className="flex space-x-3">
            <button className="font-bold text-xl text-stone-500 rounded-full p-2 bg-stone-300 bg-opacity-70 disabled:opacity-50">
              <img
                src={"/arrow-prev-small-svgrepo-com.svg"}
                alt="right arrow"
                className="w-5 h-5"
              />
            </button>
            <button className="font-bold text-xl text-stone-500 rounded-full p-2 bg-stone-300 bg-opacity-70 disabled:opacity-50">
              <img
                src={"/arrow-next-small-svgrepo-com.svg"}
                alt="left arrow"
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>
        <div className={`flex w-max relative overflow-x-hidden duration-300`}>
          {(isCityResData(data)
            ? data!.data.cards[1].card.card.gridElements.infoWithStyle
                .restaurants
            : data!.data.cards[2].card.card.gridElements.infoWithStyle
                .restaurants
          ).map((e, i) => (
            <Link key={e?.info?.id + i} to={"/restaurants/" + e?.info?.id}>
              <RestaurantCard resData={e}></RestaurantCard>
            </Link>
          ))}
        </div>
      </div>
      <div className="space-y-5">
        <h2 className="font-semibold text-xl">
          {isCityResData(data) && data.data.cards[2].card.card.title}
        </h2>
        <FilterBar
          info={
            isCityResData(data)
              ? data!.data.cards[3].card.card
              : data!.data.cards[1].card.card
          }
          sortConfig={sortConfig}
          facet={facet}
        />
      </div>
      <RestaurantCardsContainer
        dataList={
          isCityResData(data)
            ? data!.data.cards[4].card.card.gridElements.infoWithStyle
                .restaurants
            : data!.data.cards[2].card.card.gridElements.infoWithStyle
                .restaurants
        }
        lat={geometry.lat}
        lng={geometry.lng}
        dataObj={{
          ...JSON.parse(
            isCityResData(data)
              ? data!.data.cards[11].card.card.gandalfRequest
              : data!.data.cards[9].card.card.gandalfRequest
          ),
          widgetOffset: data!.data.pageOffset.widgetOffset,
          nextOffset: data!.data.pageOffset.nextOffset,
        }}
      />
    </div>
  );
};

export default MainPage;
