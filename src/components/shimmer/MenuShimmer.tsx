const MenuShimmer = () => {
  return (
    <div className="w-[1000px] mx-auto flex flex-col mt-14 gap-y-8">
      <div className="bg-shimmerGradient h-40"></div>
      <div className="flex w-max mx-auto my-4 space-x-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-shimmerGradient w-[185px] h-[120px]"></div>
        ))}
      </div>
      <div className=" flex flex-col gap-y-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-shimmerGradient w-[1000px] h-10"></div>
        ))}
      </div>
    </div>
  );
};

export default MenuShimmer;
