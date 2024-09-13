import { useRef, useState } from "react";
import { CDN_URL } from "../utils/constants";
import { CuisinesSectionProps } from "../utils/types/props";

const CuisinesSuggestions = ({ info }: CuisinesSectionProps) => {
  const [translateValue, setTranslateValue] = useState(0);
  const [maxTranslation, setMaxTranslation] = useState(false);
  const cuisinesScrollRef = useRef<HTMLDivElement>(null);
  const leftScroll = () => {
    if (cuisinesScrollRef.current) {
      cuisinesScrollRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };
  const rightScroll = () => {
    if (cuisinesScrollRef.current) {
      cuisinesScrollRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };
  const handleScroll = () => {
    if (cuisinesScrollRef.current) {
      setTranslateValue(cuisinesScrollRef.current.scrollLeft);
      if (
        cuisinesScrollRef.current?.scrollLeft >=
        cuisinesScrollRef.current?.scrollWidth -
          cuisinesScrollRef.current?.clientWidth
      ) {
        setMaxTranslation(true);
      } else {
        setMaxTranslation(false);
      }
    }
  };
  const { header, imageGridCards } = info;
  const arr = imageGridCards?.info;
  return (
    <div className="space-y-7 mx-auto ml-0 my-3 w-[85%] border-b-2 border-stone-300">
      <div className="flex justify-between">
        <h1 className="font-semibold text-xl">{header?.title}</h1>
        <div className="flex space-x-3">
          <button
            disabled={translateValue === 0}
            className="font-bold text-xl text-stone-500 rounded-full p-2 bg-stone-300 bg-opacity-70 disabled:opacity-50"
            onClick={leftScroll}
          >
            <img
              src={"/arrow-prev-small-svgrepo-com.svg"}
              alt="right arrow"
              className="w-5 h-5"
            />
          </button>
          <button
            disabled={maxTranslation}
            className="font-bold text-xl text-stone-500 rounded-full p-2 bg-stone-300 bg-opacity-70 disabled:opacity-50"
            onClick={rightScroll}
          >
            <img
              src={"/arrow-next-small-svgrepo-com.svg"}
              alt="left arrow"
              className="w-5 h-5"
              referrerPolicy="no-referrer"
            />
          </button>
        </div>
      </div>
      <div
        className={`flex space-x-24 mix-blend-multiply duration-300 overflow-x-hidden overflow-y-hidden`}
        ref={cuisinesScrollRef}
        onScroll={handleScroll}
      >
        {arr?.map((e) => (
          <div key={e?.id}>
            <img
              alt="banner"
              src={CDN_URL + e?.imageId}
              className="relative scale-[200%] mx-9 object-cover my-12"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CuisinesSuggestions;
