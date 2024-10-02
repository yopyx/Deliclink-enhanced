import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../utils/types/reactReduxHooks";
import { GeoLocationStateProp } from "../utils/types/slicesState";
import getPreSearchCuisines from "../utils/functions/getPreSearchCuisines";
import CuisinesSuggestions from "./CuisinesSuggestions";
import { isCuisinesCard } from "../utils/constants";
import { useEffect, useRef, useState } from "react";
import SearchSuggestions from "./SearchSuggestions";
import {
  addSearchQuery,
  addSelectedSuggestion,
} from "../utils/redux/searchSlice";
import SearchResults from "./SearchResults";
import SearchShimmer from "./shimmer/SearchShimmer";

const Search = () => {
  const dispatch = useAppDispatch();
  const [viewSuggestions, setViewSuggestions] = useState(false);
  const { geometry } = useAppSelector(
    (store) => store.geoLocation.currentLocation
  ) as GeoLocationStateProp;
  const { searchQuery, selectedSuggestion } = useAppSelector(
    (store) => store.search
  );
  const [text, setText] = useState("");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const { data, status } = useQuery({
    queryKey: ["Search", geometry.lat, geometry.lng],
    queryFn: () => getPreSearchCuisines(geometry.lat, geometry.lng),
  });
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      dispatch(addSearchQuery(e.target.value));
    }, 500);
  };
  useEffect(() => {
    return () => {
      dispatch(addSearchQuery(""));
      dispatch(addSelectedSuggestion({}));
    };
  }, [dispatch]);
  if (status === "pending") {
    return <SearchShimmer />;
  }
  return (
    <div className="w-[65%] my-32 mx-auto flex flex-col gap-y-36 overflow-x-hidden">
      <div className="flex flex-col gap-y-5">
        <input
          type="text"
          value={text}
          onChange={handleQueryChange}
          onFocus={() => setViewSuggestions(true)}
          onBlur={() => setTimeout(() => setViewSuggestions(false), 200)}
          placeholder="Search for restaurants and food"
          className="p-2 relative z-[15]"
        />
        {viewSuggestions && searchQuery && (
          <SearchSuggestions
            lat={geometry.lat}
            lng={geometry.lng}
            searchQuery={searchQuery}
            handleInputText={setText}
          />
        )}
        {selectedSuggestion?.query && (
          <SearchResults
            lat={geometry.lat}
            lng={geometry.lng}
            query={selectedSuggestion.query}
            meta={selectedSuggestion.meta}
            type={selectedSuggestion.type}
          />
        )}
      </div>
      {data!.data.cards.find((e) => isCuisinesCard(e)) && (
        <CuisinesSuggestions
          info={data!.data.cards.find((e) => isCuisinesCard(e))!.card.card}
          updateText={setText}
        />
      )}
    </div>
  );
};

export default Search;
