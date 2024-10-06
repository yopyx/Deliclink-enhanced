import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import { TopRestaurantsProps } from "../utils/types/props";
import { useRef, useState } from "react";

const TopRestaurants = ({ info }: TopRestaurantsProps) => {
  const [translateValue, setTranslateValue] = useState(0);
  const [maxTranslation, setMaxTranslation] = useState(false);
  const cardScrollRef = useRef<HTMLDivElement>(null);
  const leftScroll = () => {
    if (cardScrollRef.current) {
      cardScrollRef.current.scrollBy({
        behavior: "smooth",
        left: -400,
      });
    }
  };
  const rightScroll = () => {
    if (cardScrollRef.current) {
      cardScrollRef.current.scrollBy({
        behavior: "smooth",
        left: 400,
      });
    }
  };
  const handleScroll = () => {
    if (cardScrollRef.current) {
      setTranslateValue(cardScrollRef.current.scrollLeft);
      if (
        cardScrollRef.current.scrollLeft >=
        cardScrollRef.current.scrollWidth - cardScrollRef.current.clientWidth
      ) {
        setMaxTranslation(true);
      } else {
        setMaxTranslation(false);
      }
    }
  };
  return (
    <div className="flex flex-col w-[85%] mx-auto ml-0 overflow-x-hidden border-b-2 border-stone-300 pb-10">
      <div className="flex justify-between">
        <h2 className="font-semibold text-xl lg:text-lg">
          {info.header.title}
        </h2>
        <div className="flex space-x-3 lg:hidden">
          <button
            disabled={translateValue === 0}
            className="font-bold text-xl text-stone-500 rounded-full p-2 bg-stone-300 bg-opacity-70 disabled:opacity-50"
            onClick={leftScroll}
          >
            <img
              src={"/arrow-prev-small-svgrepo-com.svg"}
              alt="right arrow"
              className="w-5 h-5"
            />
          </button>
          <button
            disabled={maxTranslation}
            className="font-bold text-xl text-stone-500 rounded-full p-2 bg-stone-300 bg-opacity-70 disabled:opacity-50"
            onClick={rightScroll}
          >
            <img
              src={"/arrow-next-small-svgrepo-com.svg"}
              alt="left arrow"
              className="w-5 h-5"
            />
          </button>
        </div>
      </div>
      <div
        className={`flex duration-300 lg:overflow-x-scroll overflow-x-hidden overflow-y-hidden`}
        ref={cardScrollRef}
        onScroll={handleScroll}
      >
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
