import RestaurantCard from "./RestaurantCard";
import { LEFT_ARROW_ICON, RIGHT_ARROW_ICON } from "../utils/constants";
import RestaurantCardsContainer from "./RestaurantCardsContainer";

import CuisinesSuggestions from "./CuisinesSuggestions";
import { useQuery } from "@tanstack/react-query";
import getCityResData from "../utils/functions/getCityResData";
import { useAppSelector } from "../utils/types/reactReduxHooks";
import { GeoLocationStateProp } from "../utils/types/slicesState";
import FilterBar from "./FilterBar";
import { Link } from "react-router-dom";

const MainPage = () => {
  const { city, geometry } = useAppSelector(
    (store) => store.geoLocation.currentLocation
  ) as GeoLocationStateProp;
  const { data, status, error } = useQuery({
    queryKey: ["city data", city],
    queryFn: () => getCityResData(geometry.lat, geometry.lng),
  });
  if (status === "pending") {
    return <div>loading...</div>;
  }
  if (status === "error") {
    return <div>{JSON.stringify(error)}</div>;
  }
  return (
    <div className="w-[85%] my-10 mx-auto mr-0 flex flex-col space-y-10 overflow-x-hidden">
      <CuisinesSuggestions info={data!.data.cards[0].card.card} />
      <div className="flex flex-col w-[85%] overflow-x-hidden border-b-2 border-stone-300 pb-10">
        <div className="flex justify-between">
          <h2 className="font-semibold text-xl">
            {data!.data.cards[1].card.card.header.title}
          </h2>
          <div className="flex space-x-3">
            <button className="font-bold text-xl text-stone-500 rounded-full px-3 bg-stone-300 bg-opacity-70 disabled:opacity-50">
              <img src={LEFT_ARROW_ICON} alt="left arrow" className="h-3" />
            </button>
            <button className="font-bold text-xl text-stone-500 rounded-full px-3 bg-stone-300 bg-opacity-70 disabled:opacity-50">
              <img src={RIGHT_ARROW_ICON} alt="right arrow" className="h-3" />
            </button>
          </div>
        </div>
        <div className={`flex w-max relative overflow-x-hidden duration-300`}>
          {data!.data.cards[1].card.card.gridElements.infoWithStyle.restaurants.map(
            (e, i) => (
              <Link key={e?.info?.id + i} to={"/restaurants/" + e?.info?.id}>
                <RestaurantCard resData={e}></RestaurantCard>
              </Link>
            )
          )}
        </div>
      </div>
      <div className="space-y-5">
        <h2 className="font-semibold text-xl">
          {data!.data.cards[2].card.card.title}
        </h2>
        <FilterBar />
      </div>
      <RestaurantCardsContainer
        dataList={
          data!.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
        }
      />
    </div>
  );
};

export default MainPage;
