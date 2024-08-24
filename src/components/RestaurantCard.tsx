const RestaurantCard = () => {
  return (
    <div
      className="ml-4 mt-4 flex flex-col space-y-1 w-64 border-2 border-slate-300 p-2 h-80 hover:border-st_orange hover:scale-95 duration-500 bg-white/30 rounded-sideRounded"
      data-testid="resCard"
    >
      <div className="rounded-sideRounded">
        {
          <div className="absolute w-[237px] h-40 bg-gradient-to-t from-black rounded-sideRounded">
            <h4 className="text-white font-bold text-lg pt-32 pl-2">
              price range
            </h4>
          </div>
        }
        <img
          src={""}
          alt="restaurant card"
          id="pic1"
          className={"w-64 h-40 object-cover rounded-sideRounded" + ""}
        />
      </div>
      <h3 className="font-bold">fill</h3>
      <p className="text-[#868686] text-sm"></p>
      <div className="flex space-x-2">
        <div
          id="rate"
          className="bg-green-700 border-2 border-stone-300 w-max h-max text-white inline-block px-1 py-0"
        >
          <h5 className="text-sm">{"★ " + "fill"}</h5>
        </div>
        <p className="text-sm px-1 border-2 border-stone-300">fill</p>
      </div>
      <p className="text-sm">fill</p>
    </div>
  );
};
export default RestaurantCard;
