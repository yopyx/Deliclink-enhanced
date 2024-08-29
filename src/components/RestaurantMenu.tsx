import { useState } from "react";
import { useParams } from "react-router-dom";
import Offer from "./Offer";
import MenuCategory from "./MenuCategory";
import { useQuery } from "@tanstack/react-query";
import getMenuData from "../utils/functions/getMenuData";
import { useAppSelector } from "../utils/types/reactReduxHooks";
import { GeoLocationStateProp } from "../utils/types/slicesState";

const RestaurantMenu = () => {
  const [veg, setVeg] = useState(false);
  const { geometry } = useAppSelector(
    (store) => store.geoLocation.currentLocation
  ) as GeoLocationStateProp;
  const { resId } = useParams();
  const { data, status, error } = useQuery({
    queryKey: ["menu", resId],
    queryFn: () => getMenuData(geometry.lat, geometry.lng, resId || ""),
    enabled: resId !== undefined,
  });
  return (
    <div className="menu-page block w-w1000 mx-auto">
      <div className="res-info mt-14 p-3 bg-[#ffddcd] border-2 border-st_orange">
        <h2 className="font-bold text-lg">name</h2>
        <div id="rk" className="flex flex-col flex-wrap space-y-1 h-28">
          <p>cuisines</p>
          <p>costForTwoMessage</p>
          <div className="flex space-x-3">
            <p
              className={
                "font-semibold px-1 border-2 border-dashed border-stone-400"
              }
            >
              Open
            </p>
            <p>Next Close Time :</p>
          </div>
          <p className="">Service Availability:</p>(
          <div className="w-max font-semibold ml-auto mr-2 px-1 border-2 border-dashed border-st_orange">
            <h4 className="mx-auto text-center">★ avgRating</h4>
            <h5 className="ml-auto">totalRatings</h5>
          </div>
          )
        </div>
      </div>
      <div className="res-offers flex w-max mx-auto my-4">
        {[]?.map((o, i) => (
          <Offer />
        ))}
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
        {[].map((c, i) => (
          <MenuCategory />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
