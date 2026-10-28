import { useQueries } from "@tanstack/react-query";
import getSearchResults from "../utils/functions/getSearchResults";
import { SearchResultsProps } from "../utils/types/props";
import { FilterState } from "../utils/types/slicesState";
import { useAppDispatch, useAppSelector } from "../utils/types/reactReduxHooks";
import { isDishResCard, isResCardResult, isSortCard } from "../utils/constants";
import FilterBar from "./FilterBar";
import { useEffect, useState } from "react";
import SearchResultedResCard from "./SearchResultedResCard";
import { Link } from "react-router";
import { ResCardResult } from "../utils/types/fetchedData";
import SearchResultedDishCard from "./SearchResultedDishCard";
import { resetState } from "../utils/redux/filterSlice";
import SearchResultsShimmer from "./shimmer/SearchResultsShimmer";
import NoResults from "./error/NoResults";

const SearchResults = ({ lat, lng, query, meta, type }: SearchResultsProps) => {
  const dispatch = useAppDispatch();
  const { cartData } = useAppSelector((store) => store.cart);
  const { sortConfig, facets, facetsInDetail }: FilterState = useAppSelector(
    (store) => store.filter,
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
            facetsInDetail,
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
            facetsInDetail,
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
            } text-sm sec:text-xs rounded-full p-2 hover:bg-orange-600 hover:text-white`}
            onClick={() => setResCategory(e[0] === "R")}
          >
            {e}
          </button>
        ))}
      </div>
      {!resCategory &&
        data[0].data?.data.cards[0]?.groupedCard?.cardGroupMap?.DISH?.cards?.find(
          (e) => isSortCard(e),
        ) && (
          <FilterBar
            info={
              data[0].data?.data.cards[0].groupedCard.cardGroupMap.DISH.cards.find(
                (e) => isSortCard(e),
              )!.card.card
            }
            sortConfig={sortConfig}
            facet={facets}
          />
        )}
      <div className="w-[100%] bg-[#fbe6dd] z-[5]">
        <div className="shadow-inner shadow-yellow-600 sec:shadow-none sec:p-0 p-5 mx-auto ml-0 gap-y-5 justify-evenly rounded-lg">
          {resCategory ? (
            data[1].data?.data.cards[0].groupedCard.cardGroupMap.RESTAURANT
              ?.cards ? (
              data[1].data?.data.cards[0].groupedCard.cardGroupMap.RESTAURANT.cards
                .reduce(
                  (a, c) =>
                    a.concat(
                      isResCardResult(c)
                        ? [c.card.card]
                        : c.card.card.restaurants,
                    ),
                  [] as ResCardResult["card"]["card"][],
                )
                .map((c, i) => (
                  <Link
                    key={c.info.id + i}
                    to={`/restaurants/${c!.info.id}?lat=${lat}&lng=${lng}&info=${encodeURIComponent(JSON.stringify(c))}`}
                  >
                    <SearchResultedResCard info={c.info} />
                  </Link>
                ))
            ) : (
              <NoResults />
            )
          ) : data[0].data?.data.cards[0].groupedCard.cardGroupMap.DISH
              ?.cards ? (
            data[0].data?.data.cards[0].groupedCard.cardGroupMap.DISH.cards
              .filter((e) => isDishResCard(e))
              .map((c) => (
                <div key={c.card.card.restaurant.info.id} className="">
                  <h2 className="border-2 border-white bg-orange-800 p-1.5 font-semibold text-white rounded-lg">
                    {c.card.card.restaurant.info.name}
                  </h2>
                  <div className="flex flex-wrap justify-between gap-y-2">
                    {c.card.card.dishes.map((d, i) => (
                      <SearchResultedDishCard
                        key={d?.info?.id + i}
                        dishData={d}
                        storedItems={cartData}
                        resName={c.card.card.restaurant.info.name}
                      />
                    ))}
                  </div>
                </div>
              ))
          ) : (
            <NoResults />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
