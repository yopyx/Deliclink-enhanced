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
      <div className="flex justify-between w-[450px] h-max border-2 p-2 mt-2 bg-white xl-cart:cart-items-xl">
        <div className="w-[440px] h-32 space-y-1 flex flex-col text-sm">
          <h4 className="font-bold">{name}</h4>
          <p className="w-60 text-gray-500">{category}</p>
          <p className="">{"₹" + (defaultPrice || price) / 100}</p>
          <p className="">
            {"total = ₹" + ((defaultPrice || price) / 100) * +itemsCount}
          </p>
        </div>
        <div>
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
    <div className="bg-sunset w-[1000px] h-62 border-2 border-b-st_orange p-3 mt-4">
      <h4 className="font-bold pb-3">{name}</h4>
      <div className="w-[1000px] h-60 flex flex-col flex-wrap">
        <p className="pb-1">{category}</p>
        <p className="w-[600px] text-gray-600 pb-1">{description}</p>

        <p className="pb-1 font-semibold">
          {"₹" + (defaultPrice || price) / 100}
        </p>
        <img
          src={
            imageId
              ? CDN_URL + imageId
              : "/pngtree-dish-icon-cartoon-style-png-image_1854116.jpg"
          }
          alt="default"
          className="w-48 h-48 mx-auto object-cover rounded-md border-2 border-st_orange"
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
