import { useQueries } from "@tanstack/react-query";
import getSearchResults from "../utils/functions/getSearchResults";
import { SearchResultsProps } from "../utils/types/props";
import { FilterState } from "../utils/types/slicesState";
import { useAppDispatch, useAppSelector } from "../utils/types/reactReduxHooks";
import { isDishResCard, isResCardResult, isSortCard } from "../utils/constants";
import FilterBar from "./FilterBar";
import { useEffect, useState } from "react";
import SearchResultedResCard from "./SearchResultedResCard";
import { Link } from "react-router-dom";
import { ResCardResult } from "../utils/types/fetchedData";
import SearchResultedDishCard from "./SearchResultedDishCard";
import { resetState } from "../utils/redux/filterSlice";
import SearchResultsShimmer from "./shimmer/SearchResultsShimmer";

const SearchResults = ({ lat, lng, query, meta, type }: SearchResultsProps) => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((store) => store.cart);
  const { sortConfig, facets, facetsInDetail }: FilterState = useAppSelector(
    (store) => store.filter
  );
  const [resCategory, setResCategory] = useState(type === "RESTAURANT");
  const data = useQueries({
    queries: [
      {
        queryKey: [
          "search resulted dishes",
          lat,
          query,
          meta,
          sortConfig.sortKey,
          JSON.stringify(facets),
        ],
        queryFn: () =>
          getSearchResults(
            lat,
            lng,
            query,
            meta,
            "DISH",
            sortConfig.sortKey,
            facetsInDetail
          ),
      },
      {
        queryKey: ["search resulted restaurants", lat, query, meta],
        queryFn: () =>
          getSearchResults(
            lat,
            lng,
            query,
            meta,
            "RESTAURANT",
            sortConfig.sortKey,
            facetsInDetail
          ),
      },
    ],
  });
  // const dishesData = useQuery({
  //   queryKey: ["search resulted dishes", lat, query, meta],
  //   queryFn: () => getSearchResults(lat, lng, query, meta,"DISH"),
  // });
  // const restaurantsData = useQuery({
  //   queryKey: ["search resulted restaurants", lat, query, meta],
  //   queryFn: () => getSearchResults(lat, lng, query, meta,"RESTAURANT"),
  // });
  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch, lat]);
  if (data[0].status === "pending" || data[1].status === "pending") {
    return <SearchResultsShimmer />;
  }
  return (
    <div className="w-[65%] mx-auto ml-0 flex flex-col gap-y-5 absolute my-14 rounded-lg">
      <div className="space-x-3">
        {["Restaurants", "Dishes"].map((e) => (
          <button
            key={e}
            className={`${
              (e === "Restaurants" && resCategory) ||
              (e === "Dishes" && !resCategory)
                ? "bg-orange-600 text-white"
                : "bg-slate-300 text-black"
            } text-sm rounded-full p-2 hover:bg-orange-600 hover:text-white`}
            onClick={() => setResCategory(e[0] === "R")}
          >
            {e}
          </button>
        ))}
      </div>
      {!resCategory &&
        data[0].data?.data.cards[0]?.groupedCard?.cardGroupMap?.DISH?.cards?.find(
          (e) => isSortCard(e)
        ) && (
          <FilterBar
            info={
              data[0].data?.data.cards[0].groupedCard.cardGroupMap.DISH.cards.find(
                (e) => isSortCard(e)
              )!.card.card
            }
            sortConfig={sortConfig}
            facet={facets}
          />
        )}
      <div className="bg-sunset shadow-inner shadow-yellow-600 p-5 z-[5] mx-auto ml-0 flex flex-wrap justify-between gap-y-5 rounded-lg lg-search:search-results-lg xl-search:search-results-xl">
        {resCategory
          ? data[1].data?.data.cards[0].groupedCard.cardGroupMap.RESTAURANT?.cards
              .reduce(
                (a, c) =>
                  a.concat(
                    isResCardResult(c) ? [c.card.card] : c.card.card.restaurants
                  ),
                [] as ResCardResult["card"]["card"][]
              )
              .map((e, i) => (
                <Link key={e.info.id + i} to={"/restaurants/" + e.info.id}>
                  <SearchResultedResCard info={e.info} />
                </Link>
              ))
          : data[0].data?.data.cards[0].groupedCard.cardGroupMap.DISH?.cards
              .filter((e) => isDishResCard(e))
              .map((e, i) => (
                <SearchResultedDishCard
                  key={e.card.card.info.id + i}
                  dishData={e.card.card}
                  storedItems={items}
                />
              ))}
      </div>
    </div>
  );
};

export default SearchResults;
