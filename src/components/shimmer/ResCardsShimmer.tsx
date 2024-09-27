const ResCardsShimmer = ({ len }: { len: number }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {[...Array(len)].map((_, i) => (
        <div className="h-max ml-4 mt-4" key={i}>
          <div className="bg-shimmerGradient w-[252px] h-44 mb-4 rounded-sideRounded"></div>
          <div className="bg-shimmerGradient w-20 h-7 mb-4"></div>
          <div className="bg-shimmerGradient w-32 h-5 mb-4"></div>
          <div className="bg-shimmerGradient w-32 h-5"></div>
        </div>
      ))}
    </div>
  );
};

export default ResCardsShimmer;
