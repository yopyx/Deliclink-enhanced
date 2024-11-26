import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";
import { RestaurantCardsContainerProps } from "../utils/types/props";
import { useInfiniteQuery } from "@tanstack/react-query";
import getResCardsData from "../utils/functions/getResCardsData";
import { useCallback, useMemo, useRef } from "react";
import { isGridCard2 } from "../utils/constants";
import ResCardsShimmer from "./shimmer/ResCardsShimmer";
import { ResData, ResData2 } from "../utils/types/fetchedData";
import NoResults from "./error/NoResults";

const RestaurantCardsContainer = ({
  dataList,
  lat,
  lng,
  dataObj,
  sortConfig,
  facets,
}: RestaurantCardsContainerProps) => {
  const observer = useRef<IntersectionObserver>();
  const {
    data,
    error,
    status,
    isFetching,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "restaurants list",
      lat,
      JSON.stringify(sortConfig),
      JSON.stringify(facets),
    ],
    queryFn: ({ pageParam }) => getResCardsData(lat, lng, pageParam),
    initialPageParam: dataObj,
    getNextPageParam: (prevData) => {
      return (
        (prevData?.data.success.pageOffset.nextOffset &&
          prevData?.data.success.cards && {
            sortAttribute: sortConfig.sortKey,
            facets,
            isFiltered:
              JSON.stringify({ sortConfig, facets }) !==
              '{"sortConfig":{"sortTitle":"Relevance(Default)","sortKey":"relevance"},"facets":{}}',
            queryId: dataObj.queryId,
            seoParams: dataObj.seoParams,
            nextOffset: prevData.data.success.pageOffset.nextOffset,
            widgetOffset: prevData.data.success.pageOffset.widgetOffset,
          }) ||
        undefined
      );
    },
  });
  const lastElementRef = useCallback(
    (node: HTMLAnchorElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isFetching && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, isFetching, hasNextPage, fetchNextPage]
  );
  const updatedList = useMemo(() => {
    return data?.pages.flatMap((page) =>
      page?.data?.success?.cards?.find((e) => isGridCard2(e))
    )
      ? data?.pages.flatMap(
          (page) =>
            page?.data?.success?.cards?.find((e) => isGridCard2(e))?.card?.card
              ?.gridElements?.infoWithStyle?.restaurants
        )
      : ([] as (ResData | ResData2)[]);
  }, [data]);
  if (status === "pending") {
    return <ResCardsShimmer len={4} />;
  }
  if (status === "error") {
    return <div>{JSON.stringify(error)}</div>;
  }
  return (
    <div className="w-[90%] mx-auto ml-0 flex flex-col gap-y-7 overflow-y-hidden justify-center">
      <div className="flex flex-wrap gap-x-1 mx-auto -ml-1 4k:res-container-4k 2xl:res-container-2xl lg:res-container-lg">
        {dataList?.length ? (
          [
            ...((JSON.stringify({ sortConfig, facets }) ===
              '{"sortConfig":{"sortTitle":"Relevance(Default)","sortKey":"relevance"},"facets":{}}' &&
              dataList) ||
              []),
            ...(updatedList?.[0] ? updatedList : []),
          ].map((c, i) => (
            <Link
              key={c!.info.id + i}
              to={"/restaurants/" + c!.info.id}
              ref={lastElementRef}
            >
              <RestaurantCard resData={c!}></RestaurantCard>
            </Link>
          ))
        ) : (
          <NoResults />
        )}
      </div>
      {isFetchingNextPage && <div className="spin w-16 h-16 mx-auto"></div>}
    </div>
  );
};

export default RestaurantCardsContainer;
