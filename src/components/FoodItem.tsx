import { useState } from "react";
import { FoodItemProps } from "../utils/types/props";
import { CDN_URL } from "../utils/constants";
import { useAppDispatch } from "../utils/types/reactReduxHooks";
import { addItem, removeItem, removeItemGroup } from "../utils/redux/cartSlice";

const FoodItem = ({ info, storedItems, checkout }: FoodItemProps) => {
  const dispatch = useAppDispatch();
  const [itemsCount, setItemsCount] = useState(
    storedItems[info.id] ? storedItems[info.id].num + "" : "Add"
  );
  const { name, category, defaultPrice, price, description, imageId } = info;
  return checkout ? (
    storedItems[info.id] && (
      <div className="flex justify-between h-max border-2 p-2 mt-2 bg-white">
        <div className="h-32 space-y-1 flex flex-col text-sm">
          <h4 className="font-bold">{name}</h4>
          <p className="w-60 lg:w-auto text-gray-500">{category}</p>
          <p className="">{"₹" + (defaultPrice || price) / 100}</p>
          <p className="">
            {"total = ₹" + ((defaultPrice || price) / 100) * +itemsCount}
          </p>
        </div>
        <div className="">
          <img
            src={
              imageId
                ? CDN_URL + imageId
                : "/pngtree-dish-icon-cartoon-style-png-image_1854116.jpg"
            }
            alt="default"
            className="w-24 h-24 mx-auto mr-2 object-cover rounded-md border-2 border-green-500"
          />
          <div className="flex flex-wrap justify-between w-24 mx-auto text-center font-bold bg-[#efcbbc] border-2 rounded-lg">
            <button
              className="cursor-pointer px-2 text-center rounded-lg hover:bg-red-500 hover:text-white"
              onClick={() => {
                if (itemsCount !== "Add") {
                  setItemsCount(
                    itemsCount === "1" ? "Add" : +itemsCount - 1 + ""
                  );
                  dispatch(removeItem(info));
                }
              }}
            >
              -
            </button>
            <div className="flex space-x-1">
              <button className="">{itemsCount}</button>
              {itemsCount !== "Add" && (
                <button
                  className="cursor-pointer text-center rounded-lg font-semibold hover:text-red-600"
                  onClick={() => {
                    setItemsCount("Add");
                    dispatch(removeItemGroup(info));
                  }}
                >
                  X
                </button>
              )}
            </div>
            <button
              className="cursor-pointer px-2 text-center rounded-lg hover:bg-green-500 hover:text-white"
              onClick={() => {
                setItemsCount(
                  itemsCount === "Add" ? "1" : +itemsCount + 1 + ""
                );
                dispatch(addItem(info));
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    )
  ) : (
    <div className="flex justify-between mobile:flex-col bg-sunset border-2 border-b-st_orange p-3 mt-4 lg2:text-sm mobile:text-xs">
      <div className="w-full flex flex-col lg2:text-xs">
        <h4 className="font-bold pb-3">{name}</h4>
        <p className="pb-1">{category}</p>
        <p className="w-[60%] mobile:w-full text-gray-600 pb-1">
          {description}
        </p>

        <p className="pb-1 font-semibold">
          {"₹" + (defaultPrice || price) / 100}
        </p>
      </div>
      <div className="my-auto">
        <img
          src={
            imageId
              ? CDN_URL + imageId
              : "/pngtree-dish-icon-cartoon-style-png-image_1854116.jpg"
          }
          alt="default"
          className="w-48 h-48 sec:w-32 sec:h-32 mx-auto object-cover rounded-md border-2 border-st_orange"
        />
        <div className="flex flex-wrap justify-between w-40 mt-2 mx-auto text-center font-bold bg-[#efcbbc] border-2 rounded-lg">
          <button
            className="cursor-pointer px-4 rounded-lg hover:bg-red-500 hover:text-white"
            onClick={() => {
              if (itemsCount !== "Add") {
                setItemsCount(
                  itemsCount === "1" ? "Add" : +itemsCount - 1 + ""
                );
                dispatch(removeItem(info));
              }
            }}
          >
            -
          </button>
          <div className="flex">
            <button className="px-4">{itemsCount}</button>
            {itemsCount !== "Add" && (
              <button
                className="cursor-pointer text-center rounded-lg font-semibold hover:text-red-600"
                onClick={() => {
                  setItemsCount("Add");
                  dispatch(removeItemGroup(info));
                }}
              >
                X
              </button>
            )}
          </div>
          <button
            className="cursor-pointer px-4 rounded-lg hover:bg-green-500 hover:text-white"
            onClick={() => {
              setItemsCount(itemsCount === "Add" ? "1" : +itemsCount + 1 + "");
              dispatch(addItem(info));
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
