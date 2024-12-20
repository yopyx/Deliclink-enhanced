import FilterShimmer from "./FilterShimmer";
import ResCardsShimmer from "./ResCardsShimmer";

const MainPageShimmer = () => {
  return (
    <div className="w-[85%] md-h:w-[565px] my-10 mx-auto mr-0 flex flex-col space-y-20">
      <div className="flex flex-col space-y-16">
        <div className="bg-shimmerGradient h-5 w-56"></div>
        <div className="flex gap-x-7 sec:gap-x-5">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-shimmerGradient rounded-full h-24 w-24 sec:h-14 sec:w-14"
            ></div>
          ))}
        </div>
      </div>
      <div className="flex flex-col space-y-16">
        <div className="bg-shimmerGradient h-5 w-56"></div>
        <ResCardsShimmer len={4} />
      </div>
      <div className="flex flex-col space-y-16">
        <FilterShimmer />
        <div className="bg-shimmerGradient h-5 w-56"></div>
        <ResCardsShimmer len={8} />
      </div>
    </div>
  );
};

export default MainPageShimmer;
