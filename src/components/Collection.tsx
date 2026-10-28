import { useQuery } from "@tanstack/react-query";
import getCollectionData from "../utils/functions/getCollectionData";
import { useAppSelector } from "../utils/types/reactReduxHooks";
import { FilterState } from "../utils/types/slicesState";
import {
  isCollectionInfo,
  isCollectionResData,
  isGridCard2,
  isSortCard,
} from "../utils/constants";
import FilterBar from "./FilterBar";
import CollectionCardsContainer from "./CollectionCardsContainer";
import { ResData, ResData2 } from "../utils/types/fetchedData";
import CollectionShimmer from "./shimmer/CollectionShimmer";
import { useParams, useSearchParams } from "react-router";

const Collection = () => {
  const currentLocation = useAppSelector(
    (store) => store.geoLocation.currentLocation,
  );
  const { sortConfig, facets }: FilterState = useAppSelector(
    (store) => store.filter,
  );
  const { pathParams, title } = useAppSelector((store) => store.collection);
  //const [collectionId] = pathParams.match(/(?<=[=])[^&]+/g) || ["", "", "", ""];
  const { coId } = useParams();
  const [params] = useSearchParams();
  const [titleQuery, lat, lng] = [
    params.get("title"),
    params.get("lat"),
    params.get("lng"),
  ];
  const { data, status, error } = useQuery({
    queryKey: [
      "collection",
      lat || currentLocation.geometry.lat,
      coId,
      sortConfig.sortKey,
      JSON.stringify(facets),
    ],
    queryFn: () =>
      getCollectionData(
        lat || currentLocation.geometry.lat,
        lng || currentLocation.geometry.lng,
        coId || pathParams,
        sortConfig.sortKey,
        facets,
      ),
  });
  if (status === "pending") {
    return <CollectionShimmer />;
  }
  if (status === "error") {
    return <div>{JSON.stringify(error)}</div>;
  }
  return (
    <div className="w-[85%] sec:w-[100%] my-14 mx-auto mr-0 flex flex-col space-y-10 lg:page-lg">
      <div className="flex flex-col gap-7">
        <h2 className="text-4xl font-semibold sec:text-2xl">
          {titleQuery || title}
        </h2>
        <p className="text-lg font-semibold bg-red-700 text-stone-400">
          {
            data?.data.cards.find((e) => isCollectionInfo(e))?.card.card[
              "@type"
            ]
          }
        </p>
      </div>
      {data!.data.cards.find((e) => isSortCard(e)) && (
        <FilterBar
          info={data!.data.cards.find((e) => isSortCard(e))!.card.card}
          sortConfig={sortConfig}
          facet={facets}
        />
      )}
      {
        <CollectionCardsContainer
          dataList={[
            ...data!.data.cards
              .filter((e) => isCollectionResData(e))
              .map((e) => e.card.card),
            ...data!.data.cards
              .filter((e) => isGridCard2(e))
              .reduce(
                (a, c) =>
                  a.concat(c.card.card.gridElements.infoWithStyle.restaurants),
                [] as (ResData | ResData2)[],
              ),
          ]}
          lat={lat || currentLocation.geometry.lat}
          lng={lng || currentLocation.geometry.lng}
        />
      }
    </div>
  );
};

export default Collection;
