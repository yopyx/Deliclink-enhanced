import FilterShimmer from "./FilterShimmer";
import ResCardsShimmer from "./ResCardsShimmer";

const CollectionShimmer = () => {
  return (
    <div className="w-[85%] my-14 mx-auto mr-0 flex flex-col space-y-10">
      <div className="flex flex-col gap-7">
        <div className="bg-shimmerGradient h-9 w-40"></div>
        <div className="bg-shimmerGradient h-4 w-[500px]"></div>
      </div>
      <FilterShimmer />
      <ResCardsShimmer len={8} />
    </div>
  );
};

export default CollectionShimmer;
