import { CDN_URL } from "../utils/constants";
import { SearchResultedResCardProps } from "../utils/types/props";

const SearchResultedResCard = ({ info }: SearchResultedResCardProps) => {
  return (
    <div className="w-[450px] bg-white/30 p-4 flex gap-x-3">
      <img
        alt="banner"
        src={CDN_URL + info.cloudinaryImageId}
        className="h-24 w-24 object-cover rounded-lg"
      />
      <div className="flex flex-col gap-y-2">
        <h5 className="font-semibold text-wrap">{info.name}</h5>
        <h6 className="text-sm text-zinc-600">{`★ ${
          info.avgRating || info.avgRatingString || "Not-Rated"
        } ・ ${info.sla.slaString} ・ ${
          +info.costForTwo
            ? `₹${~~(+info.costForTwo / 100)} for two`
            : info.costForTwo
        }`}</h6>
        <h6 className="text-sm font-light">
          {info.cuisines.slice(0, 4).join(", ")}...
        </h6>
      </div>
    </div>
  );
};

export default SearchResultedResCard;
