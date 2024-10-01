const SearchShimmer = () => {
  return (
    <div className="w-[80%] my-32 mx-auto mr-0 flex flex-col gap-y-36">
      <div className="bg-shimmerGradient h-10 w-[72%] mx-auto ml-0"></div>
      <div className="flex flex-col space-y-16">
        <div className="bg-shimmerGradient h-5 w-56"></div>
        <div className="flex gap-x-7">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="bg-shimmerGradient rounded-full h-[80px] w-[80px]"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchShimmer;
