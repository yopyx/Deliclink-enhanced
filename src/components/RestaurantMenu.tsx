import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Offer from "./Offer";
import MenuCategory from "./MenuCategory";
import { useQuery } from "@tanstack/react-query";
import getMenuData from "../utils/functions/getMenuData";
import { useAppSelector } from "../utils/types/reactReduxHooks";
import { GeoLocationStateProp } from "../utils/types/slicesState";
import {
  isMenuCategoriesData,
  isMenuData2,
  isMenuData5,
  isOffersData,
} from "../utils/constants";
import { Dish } from "../utils/types/fetchedData";
import MenuShimmer from "./shimmer/MenuShimmer";

const RestaurantMenu = () => {
  const [veg, setVeg] = useState(false);
  const [viewCategory, setViewCategory] = useState("");
  const { geometry } = useAppSelector(
    (store) => store.geoLocation.currentLocation
  ) as GeoLocationStateProp;
  const { rsId } = useParams();
  const { data, status, error } = useQuery({
    queryKey: ["menu", rsId],
    queryFn: () => getMenuData(geometry.lat, geometry.lng, rsId || ""),
    enabled: rsId !== undefined,
  });
  const offers = useMemo(() => {
    return (
      data?.data.cards.find((e) => isOffersData(e))?.card.card.gridElements
        .infoWithStyle.offers || []
    );
  }, [data]);
  const menuCategories = useMemo(() => {
    return (
      data?.data.cards
        .find((e) => isMenuCategoriesData(e))
        ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.reduce(
          (a: Dish[][], c) => {
            if (isMenuData2(c)) a.push(c.card.card.itemCards);
            else if (isMenuData5(c))
              a.push(c.card.card.categories.flatMap((e) => e.itemCards));
            return a;
          },
          []
        ) || []
    );
  }, [data]);
  if (status === "pending") {
    return <MenuShimmer />;
  }
  if (status === "error") {
    return <div>{JSON.stringify(error)}</div>;
  }
  const {
    name,
    cuisines,
    costForTwoMessage,
    avgRating,
    totalRatingsString,
    availability,
    availabilityServiceabilityMessage,
  } = data!.data.cards[2].card.card.info;
  return (
    <div className="flex flex-col w-[1000px] mx-auto mt-14 gap-y-8">
      <div className="res-info p-3 bg-[#ffddcd] border-2 border-st_orange">
        <h2 className="font-bold text-lg">{name}</h2>
        <div id="rk" className="flex flex-col flex-wrap space-y-1 h-28">
          <p>{cuisines.join(", ")}</p>
          <p>{costForTwoMessage}</p>
          <div className="flex space-x-3">
            <p
              className={
                "font-semibold px-1 border-2 border-dashed border-stone-400" +
                (availability.opened ? " text-green-600" : " text-red-600")
              }
            >
              {availability.opened ? "Open" : "Closed"}
            </p>
            <p>
              {availability.opened
                ? "Next Close Time : " + availability?.nextCloseTime
                : "Next Open Time : " + availability?.nextOpenTime}
            </p>
          </div>
          <p className="">
            {"Service Availability - " +
              (availabilityServiceabilityMessage ||
                "unavailable in the mean time")}
          </p>
          {avgRating || totalRatingsString ? (
            <div className="w-max font-semibold ml-auto mr-2 px-1 border-2 border-dashed border-st_orange">
              <h4 className="mx-auto text-center">{"★ " + avgRating}</h4>
              <h5 className="ml-auto">{totalRatingsString}</h5>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="res-offers flex w-max mx-auto my-4">
        {offers.map((o, i) => (
          <Offer key={o?.info?.restId + i} info={o?.info} />
        ))}
      </div>
      <div className="flex flex-col">
        <h4
          className={
            "w-max mb-3 font-bold cursor-pointer px-1 border-2 rounded-lg hover:text-white " +
            (veg ? "bg-red-500" : "bg-green-500")
          }
          onClick={() => {
            setVeg(veg ? false : true);
          }}
        >
          {veg ? "veg-off" : "veg-on"}
        </h4>
        {menuCategories.map((c, i) => (
          <MenuCategory
            key={i}
            index={c[0].card.info.id}
            category={c}
            isVeg={veg}
            isShown={viewCategory === c[0].card.info.id}
            setViewCategory={setViewCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
