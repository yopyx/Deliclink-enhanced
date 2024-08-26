import RestaurantCard from "./RestaurantCard";
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
    queryKey: ["city data", geometry.lat],
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
            {data?.data.cards[1].card.card.header.title}
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
          {data?.data.cards[2].card.card.title}
        </h2>
        <FilterBar info={data!.data.cards[3].card.card} />
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
