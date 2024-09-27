const FilterShimmer = () => {
  return (
    <div className="flex space-x-3 ml-5">
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className="bg-shimmerGradient h-10 w-24 rounded-full"
        ></div>
      ))}
    </div>
  );
};

export default FilterShimmer;
