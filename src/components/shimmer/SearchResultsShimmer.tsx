import FilterShimmer from "./FilterShimmer";

const SearchResultsShimmer = () => {
  return (
    <div className="w-[65%] bg-[#fbe6dd] mx-auto ml-0 flex flex-col gap-y-5 absolute my-14 rounded-lg z-10">
      <div className="flex space-x-3">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="bg-shimmerGradient h-10 w-16 rounded-full"
          ></div>
        ))}
      </div>
      <FilterShimmer />
      <div className="flex space-x-3">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="bg-shimmerGradient w-[380px] h-56 rounded-lg"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsShimmer;
