import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import { TopRestaurantsProps } from "../utils/types/props";

const TopRestaurants = ({ info }: TopRestaurantsProps) => {
  return (
    <div className="flex flex-col w-[85%] overflow-x-hidden border-b-2 border-stone-300 pb-10">
      <div className="flex justify-between">
        <h2 className="font-semibold text-xl">{info.header.title}</h2>
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
        {(info.gridElements.infoWithStyle.restaurants || []).map((c, i) => (
          <Link key={c?.info?.id + i} to={"/restaurants/" + c?.info?.id}>
            <RestaurantCard resData={c}></RestaurantCard>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopRestaurants;
