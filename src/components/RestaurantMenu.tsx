import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Offer from "./Offer";
import MenuCategory from "./MenuCategory";
import { useQuery } from "@tanstack/react-query";
import getMenuData from "../utils/functions/getMenuData";
import { useAppSelector } from "../utils/types/reactReduxHooks";
import { GeoLocationStateProp } from "../utils/types/slicesState";
import { isMenuData2, isMenuData5 } from "../utils/constants";
import { Dish } from "../utils/types/fetchedData";

const RestaurantMenu = () => {
  const [veg, setVeg] = useState(false);
  const { geometry } = useAppSelector(
    (store) => store.geoLocation.currentLocation
  ) as GeoLocationStateProp;
  const { rsId } = useParams();
  const { data, status, error } = useQuery({
    queryKey: ["menu", rsId],
    queryFn: () => getMenuData(geometry.lat, geometry.lng, rsId || ""),
    enabled: rsId !== undefined,
  });
  const menuCategories = useMemo(() => {
    return (
      data?.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards.reduce(
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
    return <div>Loading...</div>;
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
    <div className="menu-page block w-w1000 mx-auto">
      <div className="res-info mt-14 p-3 bg-[#ffddcd] border-2 border-st_orange">
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
            {"Service Availability: " + availabilityServiceabilityMessage}
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
        {data?.data.cards[3].card.card.gridElements.infoWithStyle.offers.map(
          (o, i) => (
            <Offer key={i} />
          )
        )}
      </div>
      <div className="menus-container">
        <h4
          className={
            "inline-block font-bold cursor-pointer px-1 mt-14 mb-4 border-2 rounded-lg hover:text-white " +
            (veg ? "bg-red-500" : "bg-green-500")
          }
          onClick={() => {
            setVeg(veg ? false : true);
          }}
        >
          {veg ? "veg-off" : "veg-on"}
        </h4>
        {menuCategories.map((c, i) => (
          <MenuCategory key={i} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
