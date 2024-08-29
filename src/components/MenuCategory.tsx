import FoodItem from "./FoodItem";

const MenuCategory = () => {
  return (
    <div className="menu-category inl bg-slate-50/50 rounded-lg mb-6">
      ({" "}
      <h3
        className="category-title w-full inline-block font-bold text-lg cursor-pointer bg-[#efcbbc] px-1 border-2 rounded-lg hover:bg-st_orange hover:text-white"
        data-testid="category"
      >
        <span>veg list number</span>
        <span className="float-right mr-2 text-gray-500 font-thin text-2xl">
          ⋁
        </span>
      </h3>
      )
      <div className="mb-4">
        {[].map((item) => (
          <FoodItem />
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;
