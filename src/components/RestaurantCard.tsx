import { useState } from "react";
import { CDN_URL, isResData } from "../utils/constants";
import { ResData, ResData2 } from "../utils/types/fetchedData";
import { RestaurantCardProps } from "../utils/types/props";

const RestaurantCard = ({ resData }: RestaurantCardProps) => {
  const [loaded, setLoaded] = useState(true);
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } =
    resData.info;
  return (
    <div
      className="ml-4 mt-4 flex flex-col space-y-1 w-64 border-2 border-slate-300 p-2 h-80 hover:border-st_orange hover:scale-95 duration-500 bg-white/30 rounded-sideRounded"
      data-testid="resCard"
    >
      <div className="rounded-sideRounded">
        {isResData(resData)
          ? resData?.aggregatedDiscountInfoV3?.header && (
              <div className="relative z-[5] w-[237px] h-40 bg-gradient-to-t from-stone-950 bg-opacity-30 rounded-sideRounded">
                <h4 className="text-white font-bold text-lg pt-32 pl-2">
                  {resData?.aggregatedDiscountInfoV3?.header +
                    " " +
                    (resData?.aggregatedDiscountInfoV3?.subHeader || "")}
                </h4>
              </div>
            )
          : resData?.info?.aggregatedDiscountInfoV3?.header && (
              <div className="relative z-[5] w-[237px] h-40 bg-gradient-to-t from-gray-950 rounded-sideRounded">
                <h4 className="text-white font-bold text-lg pt-32 pl-2">
                  {resData?.info?.aggregatedDiscountInfoV3?.header +
                    " " +
                    (resData?.info?.aggregatedDiscountInfoV3?.subHeader || "")}
                </h4>
              </div>
            )}
        <img
          src={
            loaded
              ? CDN_URL + cloudinaryImageId
              : "/pngtree-dish-icon-cartoon-style-png-image_1854116.jpg"
          }
          alt="restaurant card"
          id="pic1"
          onError={() => setLoaded(false)}
          referrerPolicy="no-referrer"
          className={`w-64 h-40 object-cover rounded-sideRounded${
            (resData as ResData2)?.info?.aggregatedDiscountInfoV3?.header ||
            (resData as ResData)?.aggregatedDiscountInfoV3?.header
              ? " -mt-40"
              : ""
          }`}
        />
      </div>
      <h3 className="font-bold">{name}</h3>
      <p className="text-[#868686] text-sm">
        {cuisines.slice(0, 5).join(", ")}
      </p>
      <div className="flex space-x-2">
        <div
          id="rate"
          className="bg-green-700 border-2 border-stone-300 w-max h-max text-white inline-block px-1 py-0"
        >
          <h5 className="text-sm">{"★ " + (avgRating || "")}</h5>
        </div>
        <p className="text-sm px-1 border-2 border-stone-300">
          {sla?.slaString}
        </p>
      </div>
      <p className="text-sm">{costForTwo}</p>
    </div>
  );
};
export default RestaurantCard;
