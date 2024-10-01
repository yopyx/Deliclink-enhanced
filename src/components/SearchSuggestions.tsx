import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../utils/types/reactReduxHooks";
import getSearchSuggestions from "../utils/functions/getSearchSuggestions";
import { SearchSuggestionsProps } from "../utils/types/props";
import { Link } from "react-router-dom";
import { CDN_URL } from "../utils/constants";
import SearchSuggestionsShimmer from "./shimmer/SearchSuggestionsShimmer";

const SearchSuggestions = ({
  lat,
  lng,
  searchQuery,
  handleInputText,
}: SearchSuggestionsProps) => {
  const dispatch = useAppDispatch();
  const { data, status } = useQuery({
    queryKey: ["search suggestions", searchQuery, lat],
    queryFn: () => getSearchSuggestions(lat, lng, searchQuery),
    enabled: searchQuery !== "",
  });
  if (status === "pending") {
    return <SearchSuggestionsShimmer />;
  }
  if (status === "error") {
    return <div>No results found</div>;
  }
  return (
    <div className="w-[65%] bg-sunset mx-auto ml-0 flex flex-col gap-y-5 absolute z-10 my-14 rounded-lg">
      {(data?.data?.suggestions || [])
        .filter((e) => ["RESTAURANT", "CUISINE", "DISH"].includes(e.type))
        .map((e, i) => (
          <Link to={`/search?query=${e.text}`} key={e.highlightedText + i}>
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
