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
  const locationsList = useAppSelector(
    (store) => store.geoLocation.currentLocations
  ) as GeoLocationStateProp[];
  const { searchQuery, selectedSuggestion } = useAppSelector(
    (store) => store.search
  );
  const [text, setText] = useState("");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const { data, status } = useQuery({
    queryKey: [
      "Search",
      locationsList[locationsList.length - 1].geometry.lat,
      locationsList[locationsList.length - 1].geometry.lng,
    ],
    queryFn: () =>
      getPreSearchCuisines(
        locationsList[locationsList.length - 1].geometry.lat,
        locationsList[locationsList.length - 1].geometry.lng
      ),
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
          //onBlur={() => setViewSuggestions(false)}
          placeholder="Search for restaurants and food"
          className="p-2 z-[15] sec:text-xs"
        />
        {viewSuggestions && searchQuery && (
          <SearchSuggestions
            lat={locationsList[locationsList.length - 1].geometry.lat}
            lng={locationsList[locationsList.length - 1].geometry.lng}
            searchQuery={searchQuery}
            handleInputText={setText}
            updateSuggestionsView={setViewSuggestions}
          />
        )}
        {selectedSuggestion?.query && (
          <SearchResults
            lat={locationsList[locationsList.length - 1].geometry.lat}
            lng={locationsList[locationsList.length - 1].geometry.lng}
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
          updateSuggestionsView={setViewSuggestions}
        />
      )}
    </div>
  );
};

export default Search;
