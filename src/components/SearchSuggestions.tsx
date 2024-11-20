import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../utils/types/reactReduxHooks";
import getSearchSuggestions from "../utils/functions/getSearchSuggestions";
import { SearchSuggestionsProps } from "../utils/types/props";
import { Link } from "react-router-dom";
import { CDN_URL } from "../utils/constants";
import {
  addSearchSuggestions,
  addSelectedSuggestion,
} from "../utils/redux/searchSlice";
import { useEffect } from "react";
import SearchSuggestionsShimmer from "./shimmer/SearchSuggestionsShimmer";

const SearchSuggestions = ({
  lat,
  lng,
  searchQuery,
  handleInputText,
  updateSuggestionsView,
}: SearchSuggestionsProps) => {
  const dispatch = useAppDispatch();
  const { data, status } = useQuery({
    queryKey: ["search suggestions", searchQuery, lat],
    queryFn: () => getSearchSuggestions(lat, lng, searchQuery),
    enabled: searchQuery !== "",
  });
  useEffect(() => {
    if (data?.data?.suggestions) {
      dispatch(addSearchSuggestions([searchQuery, data!.data.suggestions]));
    }
  }, [searchQuery, data, dispatch]);
  if (status === "pending") {
    return <SearchSuggestionsShimmer />;
  }
  if (status === "error") {
    return <div>No results found</div>;
  }
  return (
    <div className="w-[65%] bg-sunset mx-auto ml-0 flex flex-col gap-y-5 absolute z-10 my-14 rounded-lg lg-search:search-results-lg xl-search:search-results-xl">
      {(data?.data?.suggestions || [])
        .filter((e) => ["RESTAURANT", "CUISINE", "DISH"].includes(e.type))
        .map((e, i) => (
          <Link
            to={`/search?query=${e.text}`}
            key={e.highlightedText + i}
            onClick={() => {
              dispatch(
                addSelectedSuggestion({
                  query: e.text,
                  meta: e.metadata,
                  type: e.type,
                })
              );
              handleInputText(e.text);
              updateSuggestionsView(false);
            }}
          >
            <div className="flex space-x-3 border-b-2 border-slate-300">
              <img
                alt="banner"
                src={CDN_URL + e.cloudinaryId}
                className="rounded-lg object-cover h-20 w-20"
              />
              <div className="flex flex-col my-auto">
                <h5>{e.text}</h5>
                <h5 className="text-xs font-semibold text-gray-500">
                  {e.type}
                </h5>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default SearchSuggestions;
