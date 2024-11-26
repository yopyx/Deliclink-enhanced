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
import NoResults from "./error/NoResults";

const RestaurantMenu = () => {
  const [veg, setVeg] = useState(false);
  const [viewCategory, setViewCategory] = useState("");
  const locationsList = useAppSelector(
    (store) => store.geoLocation.currentLocations
  ) as GeoLocationStateProp[];
  const { rsId } = useParams();
  const { data, status, error } = useQuery({
    queryKey: ["menu", rsId],
    queryFn: () =>
      getMenuData(
        locationsList[locationsList.length - 1].geometry.lat,
        locationsList[locationsList.length - 1].geometry.lng,
        rsId || ""
      ),
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
    <div className="flex flex-col w-[70%] justify-center mx-auto mt-14 gap-y-8">
      <div className="flex justify-between w-full p-3 bg-[#ffddcd] border-2 border-st_orange sec:text-sm">
        <div>
          <div className="flex space-x-1">
            <h2 className="font-bold text-lg inline-block mobile:text-sm">
              {name}
            </h2>
            <h4 className="hidden mx-auto text-center lg2:inline">
              {"★ " + avgRating}
            </h4>
          </div>
          <div id="rk" className="flex flex-col flex-wrap gap-y-1 h-36">
            <p>{cuisines.join(", ")}</p>
            <p>{costForTwoMessage}</p>
            <div className="flex gap-3 mobile:flex-col">
              <p
                className={
                  "my-auto w-max font-semibold px-1 border-2 border-dashed border-stone-400" +
                  (availability.opened ? " text-green-600" : " text-red-600")
                }
              >
                {availability.opened ? "Open" : "Closed"}
              </p>
              <p className="">
                {availability.opened
                  ? "Next Close Time : " + availability?.nextCloseTime
                  : "Next Open Time : " + availability?.nextOpenTime}
              </p>
              {availabilityServiceabilityMessage && (
                <p className="mobile:hidden">
                  {"Service Availability - " +
                    availabilityServiceabilityMessage}
                </p>
              )}
            </div>
          </div>
        </div>
        <div>
          {avgRating || totalRatingsString ? (
            <div className="w-max font-semibold px-1 border-2 border-dashed border-st_orange lg2:hidden">
              <h4 className="mx-auto text-center">{"★ " + avgRating}</h4>
              <h5 className="ml-auto">{totalRatingsString}</h5>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="w-full flex justify-evenly gap-x-3 mx-auto my-4 xl:justify-normal sec:overflow-x-scroll">
        {offers.map((o, i) => (
          <Offer key={o?.info?.restId + i} info={o?.info} />
        ))}
      </div>
      <h4
        className={
          "w-max mb-3 font-bold cursor-pointer px-1 border-2 rounded-lg sec:text-sm hover:text-white " +
          (veg ? "bg-red-500" : "bg-green-500")
        }
        onClick={() => {
          setVeg(veg ? false : true);
        }}
      >
        {veg ? "veg-off" : "veg-on"}
      </h4>
      <div className="w-full mx-auto justify-center flex flex-col gap-y-5">
        {menuCategories.length ? (
          menuCategories.map((c, i) => (
            <MenuCategory
              key={i}
              index={c[0].card.info.id}
              category={c}
              isVeg={veg}
              isShown={viewCategory === c[0].card.info.id}
              setViewCategory={setViewCategory}
            />
          ))
        ) : (
          <NoResults />
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
