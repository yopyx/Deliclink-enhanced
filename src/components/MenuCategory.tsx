import { MenuCategoryProps } from "../utils/types/props";
import FoodItem from "./FoodItem";

const MenuCategory = ({
  index,
  category,
  isVeg,
  isShown,
  setViewCategory,
}: MenuCategoryProps) => {
  const vegList = category.filter((item) => isVeg && item.card.info.isVeg);
  return (
    <div className="menu-category inl bg-slate-50/50 rounded-lg mb-6">
      {!isVeg || (isVeg && vegList.length) ? (
        <h3
          className="category-title w-full inline-block font-bold text-lg cursor-pointer bg-[#efcbbc] px-1 border-2 rounded-lg hover:bg-st_orange hover:text-white"
          data-testid="category"
          onClick={() => setViewCategory(isShown ? "" : index)}
        >
          <span>{`${category[0].card.info.category} (${
            isVeg ? vegList.length : category.length
          })`}</span>
          <span className="float-right mr-2 text-gray-500 font-thin text-2xl">
            {isShown ? "⋁" : "⋀"}
          </span>
        </h3>
      ) : (
        ""
      )}
      <div className={(isShown ? "" : "hidden ") + "mb-4"}>
        {(isVeg ? vegList : category).map((item) => (
          <div key={item.card.info.id}>
            <FoodItem info={item.card.info} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;