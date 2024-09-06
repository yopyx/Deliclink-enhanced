import { useState } from "react";
import { FoodItemProps } from "../utils/types/props";
import { CDN_URL } from "../utils/constants";

const FoodItem = ({ info }: FoodItemProps) => {
  const [itemsCount, setItemsCount] = useState("Add");
  const { name, category, defaultPrice, price, description, imageId } = info;
  return (
    <div className="item-container bg-sunset w-w1000 h-62 border-2 border-b-st_orange p-3 mt-4">
      <h4 className="font-bold pb-3">{name}</h4>
      <div className="w-w1000 h-60 flex flex-col flex-wrap">
        <p className="pb-1">{category}</p>
        <p className="w-[600px] text-gray-600 pb-1">{description}</p>
        <p className="pb-1">{"₹" + (defaultPrice || price) / 100}</p>
        <img
          src={imageId ? CDN_URL + imageId : "/3-HandDrawn-Sep to Jan-754.jpg"}
          alt="default"
          className="w-48 h-48 mx-auto object-cover rounded-md border-2 border-st_orange"
        />
        <div className="flex flex-wrap justify-between w-40 mt-2 mx-auto text-center font-bold bg-[#efcbbc] border-2 rounded-lg">
          <button
            className="cursor-pointer px-4 rounded-lg hover:bg-red-500 hover:text-white"
            onClick={() => {
              setItemsCount(
                itemsCount === "Add" || itemsCount === "1"
                  ? "Add"
                  : +itemsCount - 1 + ""
              );
            }}
          >
            -
          </button>
          <button className="px-4">{"Add"}</button>
          <button
            className="cursor-pointer px-4 rounded-lg hover:bg-green-500 hover:text-white"
            onClick={() => {
              setItemsCount(itemsCount === "Add" ? "1" : +itemsCount + 1 + "");
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
