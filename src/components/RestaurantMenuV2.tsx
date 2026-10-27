import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../utils/types/reactReduxHooks";
import { isDishResCard } from "../utils/constants";
import { DishResCard2, ResData, ResData2 } from "../utils/types/fetchedData";
import MenuShimmer from "./shimmer/MenuShimmer";
import getMenuDataV2 from "../utils/functions/getMenuDataV2";
import FoodItem from "./FoodItem";

const RestaurantMenuV2 = () => {
  const [veg, setVeg] = useState(false);
  const currentLocation = useAppSelector(
    (store) => store.geoLocation.currentLocation,
  );
  const { rsId } = useParams();
  const [params] = useSearchParams();
  const [lat, lng, info] = useMemo(() => {
    return [params.get("lat"), params.get("lng"), params.get("info")];
  }, [params]);
  const resData = JSON.parse(decodeURIComponent(info!)) as ResData | ResData2;
  console.log(resData);
  const { cartData } = useAppSelector((store) => store.cart);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["menu", rsId],
    queryFn: () =>
      getMenuDataV2(
        lat || currentLocation.geometry.lat,
        lng || currentLocation.geometry.lng,
        resData.info.name,
      ),
    enabled: !!resData,
  });
  const menuCategories = useMemo(() => {
    return (
      data?.data.cards[0].groupedCard.cardGroupMap.DISH?.cards.filter((e) =>
        isDishResCard(e),
      ) || []
    );
  }, [data]);
  const {
    name,
    cuisines,
    costForTwo,
    avgRating,
    totalRatingsString,
    availability,
  } = useMemo(() => {
    return resData.info;
  }, [resData]);
  if (isLoading) {
    return <MenuShimmer />;
  }
  if (isError) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div className="flex flex-col w-[70%] justify-center mx-auto mt-14 gap-y-4">
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
          <div id="rk" className="flex flex-col flex-wrap gap-y-1 h-28">
            <p>{cuisines?.join(", ")}</p>
            <p>{costForTwo}</p>
            <div className="flex gap-3 mobile:flex-col">
              <p
                className={
                  "my-auto w-max font-semibold px-1 border-2 border-dashed border-stone-400" +
                  (availability?.opened ? " text-green-600" : " text-red-600")
                }
              >
                {availability?.opened ? "Open" : "Closed"}
              </p>
              <p className="">
                {availability?.opened
                  ? "Next Close Time : " + availability?.nextCloseTime
                  : "Next Open Time : " + availability?.nextOpenTime}
              </p>
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
      <div className="w-full flex justify-evenly gap-x-3 mx-auto my-4 xl:justify-normal sec:overflow-x-scroll"></div>
      <h4
        className={
          "w-max mb-3 font-bold cursor-pointer px-1 border-2 rounded-lg sec:text-sm hover:text-transparent " +
          (veg
            ? "bg-red-500 hover:bg-green-500"
            : "bg-green-500 hover:bg-red-500")
        }
        onClick={() => {
          setVeg(veg ? false : true);
        }}
      >
        {veg ? "veg-off" : "veg-on"}
      </h4>
      <div className="w-full mx-auto justify-center flex flex-col gap-y-5">
        {menuCategories.map((c: DishResCard2) =>
          c.card.card.dishes
            .filter((d) =>
              veg ? d.info?.isVeg == undefined : d.info?.isVeg == 1,
            )
            .map((d) => (
              <div key={d.info.id}>
                <FoodItem
                  info={d.info}
                  checkout={false}
                  storedItems={cartData}
                  resName={name}
                />
              </div>
            )),
        )}
      </div>
    </div>
  );
};

export default RestaurantMenuV2;
