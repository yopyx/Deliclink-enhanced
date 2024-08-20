import RestaurantCard from "./RestaurantCard";
import { LEFT_ARROW_ICON, RIGHT_ARROW_ICON } from "../utils/constants";
import { useState } from "react";
import RestaurantCardsContainer from "./RestaurantCardsContainer";
import { FilterBar } from "./FilterBar";
import CuisinesSuggestions from "./CuisinesSuggestions";

const MainPage = () => {
  const [translateValue, setTranslateValue] = useState(0);
  return (
    <div className="w-[85%] my-10 mx-auto mr-0 flex flex-col space-y-10 overflow-x-hidden">
      <CuisinesSuggestions />
      <div className="flex flex-col w-[85%] overflow-x-hidden border-b-2 border-stone-300 pb-10">
        <div className="flex justify-between">
          <h2 className="font-semibold text-2xl">title</h2>
          <div className="flex space-x-3">
            <button
              disabled={translateValue === 0}
              className="font-bold text-xl text-stone-500 rounded-full px-3 bg-stone-300 bg-opacity-70 disabled:opacity-50"
              onClick={() => setTranslateValue(translateValue - 10)}
            >
              <img src={LEFT_ARROW_ICON} alt="left arrow" className="h-3" />
            </button>
            <button
              disabled={translateValue === 90}
              className="font-bold text-xl text-stone-500 rounded-full px-3 bg-stone-300 bg-opacity-70 disabled:opacity-50"
              onClick={() => setTranslateValue(translateValue + 10)}
            >
              <img src={RIGHT_ARROW_ICON} alt="right arrow" className="h-3" />
            </button>
          </div>
        </div>
        <div
          className={`flex w-max relative overflow-x-hidden duration-300 -translate-y-0 -translate-x-[${translateValue}%]`}
        >
          {[1]?.map((e) => (
            <RestaurantCard />
          ))}
        </div>
      </div>
      <div className="space-y-5">
        <h2 className="font-semibold text-2xl">title</h2>
        <FilterBar />
      </div>
      <RestaurantCardsContainer />
    </div>
  );
};

export default MainPage;
