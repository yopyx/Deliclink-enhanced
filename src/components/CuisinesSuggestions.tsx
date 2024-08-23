import { CDN_URL, LEFT_ARROW_ICON, RIGHT_ARROW_ICON } from "../utils/constants";
import { CuisinesSectionProps } from "../utils/types/props";

const CuisinesSuggestions = ({ info }: CuisinesSectionProps) => {
  const { header, imageGridCards } = info;
  const arr = imageGridCards?.info;
  return (
    <div className="space-y-14 mx-auto ml-0 my-3 w-[85%] h-[230px] overflow-x-hidden overflow-y-hidden border-b-2 border-stone-300">
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl">{header?.title}</h1>
        <div className="flex space-x-3">
          <button className="font-bold text-xl text-stone-500 rounded-full px-3 bg-stone-300 bg-opacity-70 disabled:opacity-50">
            <img src={LEFT_ARROW_ICON} alt="left arrow" className="h-3" />
          </button>
          <button className="font-bold text-xl text-stone-500 rounded-full px-3 bg-stone-300 bg-opacity-70 disabled:opacity-50">
            <img src={RIGHT_ARROW_ICON} alt="right arrow" className="h-3" />
          </button>
        </div>
      </div>
      <div className={`flex space-x-24 mix-blend-multiply duration-300`}>
        {arr?.map((e) => (
          <div key={e?.id} className="w-[7%]">
            <img
              alt="banner"
              src={CDN_URL + e?.imageId}
              className="relative scale-[200%] mx-9 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CuisinesSuggestions;
