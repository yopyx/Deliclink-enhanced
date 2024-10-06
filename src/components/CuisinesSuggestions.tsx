import { useRef, useState } from "react";
import { CDN_URL } from "../utils/constants";
import { CuisinesSectionProps } from "../utils/types/props";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../utils/types/reactReduxHooks";
import { addParams, addTitle } from "../utils/redux/collectionSlice";
import { addSearchQuery } from "../utils/redux/searchSlice";

const CuisinesSuggestions = ({ info, updateText }: CuisinesSectionProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
  const arr = imageGridCards.info;
  return (
    <div
      className={`${
        pathname === "/search" ? "w-[100%]" : "w-[85%]"
      } space-y-7 mx-auto ml-0 my-3 border-b-2 border-stone-300`}
    >
      <div className="flex justify-between">
        <h1 className="font-semibold text-xl">{header.title}</h1>
        <div className="flex space-x-3 lg:hidden">
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
        className={`flex mix-blend-multiply lg:cuisines-lg lg:overflow-x-scroll duration-300 overflow-x-hidden overflow-y-hidden${
          pathname === "/search" ? "" : " space-x-24"
        }`}
        ref={cuisinesScrollRef}
        onScroll={handleScroll}
      >
        {arr?.map((e) =>
          pathname === "/search" ? (
            <img
              key={e?.id}
              alt="banner"
              src={CDN_URL + e.imageId}
              className="h-32 object-cover cursor-pointer"
              onClick={() => {
                const q = decodeURIComponent(
                  e.action.link!.split("=").slice(-1)[0]
                );
                navigate(`/search?query=${q}`);
                dispatch(addSearchQuery(q));
                updateText!(q);
              }}
            />
          ) : (
            e?.action?.link?.match(/\/collections\/\d+/) && (
              <Link
                key={e?.id}
                to={`${e.action.link.match(/\/collections\/\d+/)![0]}`}
                onClick={() => {
                  dispatch(
                    addParams(
                      "collection" + e.action!.link!.split("collection_id")[1]
                    )
                  );
                  dispatch(
                    addTitle(
                      e.action.text
                        ? e.action.text
                        : e.action?.link
                            ?.match(/(?<=header_title=)[^&]+/)?.[0]
                            ?.replace(/\+/g, " ")
                    )
                  );
                }}
              >
                <img
                  alt="banner"
                  src={CDN_URL + e.imageId}
                  className="relative scale-[200%] mx-9 object-cover my-12"
                />
              </Link>
            )
          )
        )}
      </div>
    </div>
  );
};

export default CuisinesSuggestions;
