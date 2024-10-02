import { Link } from "react-router-dom";
import { CDN_URL } from "../utils/constants";
import { SearchResultedDishCardProps } from "../utils/types/props";
import { useState } from "react";
import { useAppDispatch } from "../utils/types/reactReduxHooks";
import { addItem, removeItem, removeItemGroup } from "../utils/redux/cartSlice";

const SearchResultedDishCard = ({
  dishData,
  storedItems,
}: SearchResultedDishCardProps) => {
  const dispatch = useAppDispatch();
  const [loaded, setLoaded] = useState(true);
  const [itemsCount, setItemsCount] = useState(
    storedItems[dishData.info.id]
      ? storedItems[dishData.info.id].num + ""
      : "Add"
  );
  return (
    <div className="w-[450px] bg-white/30 p-4 flex flex-col gap-y-5 4k-search:card-4k-search">
      <Link
        className="flex justify-between border-b-2 border-neutral-400 border-dotted"
        to={"/restaurants/" + dishData.restaurant.info.id}
      >
        <div className="flex flex-col gap-y-1">
          <h5 className="text-sm font-semibold text-neutral-500">
            {dishData.restaurant.info.name}
          </h5>
          <h6 className="text-sm font-light text-zinc-600">{`★ ${dishData.restaurant.info.avgRating} ・ ${dishData.restaurant.info.sla.slaString}`}</h6>
        </div>
        <p className=" mt-0 my-auto text-xl font-bold">⇒</p>
      </Link>
      <div className="flex justify-between gap-x-2">
        <div className="flex flex-col gap-y-1">
          <h4 className="font-semibold">{dishData.info.name}</h4>
          <h5>₹{dishData.info.price / 100}</h5>
        </div>
        <div className="flex flex-col">
          <img
            alt="dish"
            src={
              loaded
                ? CDN_URL + dishData.info.imageId
                : "/pngtree-dish-icon-cartoon-style-png-image_1854116.jpg"
            }
            onError={() => setLoaded(false)}
            className="mx-auto h-32 w-32 object-cover rounded-lg"
          />
          <div className="flex flex-wrap justify-between w-40 mt-2 mx-auto text-center font-bold bg-[#efcbbc] border-2 rounded-lg">
            <button
              className="cursor-pointer px-4 rounded-lg hover:bg-red-500 hover:text-white"
              onClick={() => {
                if (itemsCount !== "Add") {
                  setItemsCount(
                    itemsCount === "1" ? "Add" : +itemsCount - 1 + ""
                  );
                  dispatch(removeItem(dishData.info));
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
                    dispatch(removeItemGroup(dishData.info));
                  }}
                >
                  X
                </button>
              )}
            </div>
            <button
              className="cursor-pointer px-4 rounded-lg hover:bg-green-500 hover:text-white"
              onClick={() => {
                setItemsCount(
                  itemsCount === "Add" ? "1" : +itemsCount + 1 + ""
                );
                dispatch(addItem(dishData.info));
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultedDishCard;
