const MenuShimmer = () => {
  return (
    <div className="w-[70%] mx-auto flex flex-col mt-14 gap-y-8">
      <div className="bg-shimmerGradient h-40"></div>
      <div className="flex my-4 justify-evenly">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-shimmerGradient w-[155px] h-[90px]"></div>
        ))}
      </div>
      <div className="flex flex-col gap-y-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-shimmerGradient w-full h-10"></div>
        ))}
      </div>
    </div>
  );
};

export default MenuShimmer;
