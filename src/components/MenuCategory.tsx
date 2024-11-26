import { MenuCategoryProps } from "../utils/types/props";
import { useAppSelector } from "../utils/types/reactReduxHooks";
import FoodItem from "./FoodItem";

const MenuCategory = ({
  index,
  category,
  isVeg,
  isShown,
  setViewCategory,
}: MenuCategoryProps) => {
  const vegList = category.filter((item) => isVeg && item.card.info.isVeg);
  const { items } = useAppSelector((store) => store.cart);
  return (
    <div className="w-[100%] bg-slate-50/50 rounded-lg">
      {!isVeg || (isVeg && vegList.length) ? (
        <div
          className="flex justify-between font-bold text-lg sec:text-sm cursor-pointer bg-[#efcbbc] px-1 border-2 rounded-lg hover:bg-st_orange hover:text-white"
          data-testid="category"
          onClick={() => setViewCategory(isShown ? "" : index)}
        >
          <span>{`${category[0].card.info.category} (${
            isVeg ? vegList.length : category.length
          })`}</span>
          <span className="text-gray-500 font-thin text-2xl sec:text-lg">
            {isShown ? "⋁" : "⋀"}
          </span>
        </div>
      ) : (
        ""
      )}
      <div className={(isShown ? "" : "hidden ") + "w-full mx-auto"}>
        {(isVeg ? vegList : category).map((item) => (
          <div key={item.card.info.id}>
            <FoodItem
              info={item.card.info}
              checkout={false}
              storedItems={items}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;
