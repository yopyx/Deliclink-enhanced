import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../utils/types/reactReduxHooks";
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
import { useSearchParams } from "react-router";

const Search = () => {
  const dispatch = useAppDispatch();
  const [viewSuggestions, setViewSuggestions] = useState(false);
  const currentLocation = useAppSelector(
    (store) => store.geoLocation.currentLocation,
  );
  const [params] = useSearchParams();
  const [lat, lng] = [params.get("lat"), params.get("lng")];

  const { searchQuery, selectedSuggestion } = useAppSelector(
    (store) => store.search,
  );
  const [text, setText] = useState("");
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { data, status } = useQuery({
    queryKey: [
      "Search",
      lat || currentLocation.geometry.lat,
      lng || currentLocation.geometry.lng,
    ],
    queryFn: () =>
      getPreSearchCuisines(
        lat || currentLocation.geometry.lat,
        lng || currentLocation.geometry.lng,
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
            lat={lat || currentLocation.geometry.lat}
            lng={lng || currentLocation.geometry.lng}
            searchQuery={searchQuery}
            handleInputText={setText}
            updateSuggestionsView={setViewSuggestions}
          />
        )}
        {selectedSuggestion?.query && (
          <SearchResults
            lat={lat || currentLocation.geometry.lat}
            lng={lng || currentLocation.geometry.lng}
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
          lat={lat || currentLocation.geometry.lat}
          lng={lng || currentLocation.geometry.lng}
        />
      )}
    </div>
  );
};

export default Search;
