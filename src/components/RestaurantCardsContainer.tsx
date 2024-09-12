import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";
import { RestaurantCardsContainerProps } from "../utils/types/props";
import { useInfiniteQuery } from "@tanstack/react-query";
import getResCardsData from "../utils/functions/getResCardsData";
import { useMemo } from "react";
import { isGridCard2 } from "../utils/constants";

const RestaurantCardsContainer = ({
  dataList,
  lat,
  lng,
  dataObj,
  sortConfig,
  facet,
}: RestaurantCardsContainerProps) => {
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
      JSON.stringify(facet),
    ],
    queryFn: ({ pageParam }) => getResCardsData(lat, lng, pageParam),
    initialPageParam: dataObj,
    getNextPageParam: (prevData) => {
      return (
        (prevData?.data.success.pageOffset.nextOffset && {
          sortAttribute: sortConfig.sortKey,
          facet,
          isFiltered:
            JSON.stringify({ sortConfig, facet }) !==
            '{"sortConfig":{"sortTitle":"Relevance(Default)","sortKey":"relevance"},"facet":{}}',
          queryId: dataObj.queryId,
          seoParams: dataObj.seoParams,
          nextOffset: prevData.data.success.pageOffset.nextOffset,
          widgetOffset: prevData.data.success.pageOffset.widgetOffset,
        }) ||
        undefined
      );
    },
  });
  const updatedList = useMemo(() => {
    return (
      data?.pages.flatMap(
        (page) =>
          page?.data.success.cards.find((e) => isGridCard2(e))?.card?.card
            ?.gridElements?.infoWithStyle?.restaurants
      ) || []
    );
  }, [data]);
  if (status === "pending") {
    return <div>loading...</div>;
  }
  if (status === "error") {
    return <div>{JSON.stringify(error)}</div>;
  }
  return (
    <div className="flex flex-wrap">
      {[
        ...((JSON.stringify({ sortConfig, facet }) ===
          '{"sortConfig":{"sortTitle":"Relevance(Default)","sortKey":"relevance"},"facet":{}}' &&
          dataList) ||
          []),
        ...updatedList,
      ].map((c, i) => (
        <Link key={c!.info.id + i} to={"/restaurants/" + c!.info.id}>
          <RestaurantCard resData={c!}></RestaurantCard>
        </Link>
      ))}
      {isFetchingNextPage && <div>Loading...</div>}
    </div>
  );
};

export default RestaurantCardsContainer;
