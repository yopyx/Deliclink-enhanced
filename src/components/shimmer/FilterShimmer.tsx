const FilterShimmer = () => {
  return (
    <div className="w-full flex space-x-3 ml-5">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="bg-shimmerGradient h-[2rem] w-[8%] sec:w-[20%] rounded-full"
        ></div>
      ))}
    </div>
  );
};

export default FilterShimmer;
