import { useQuery } from "@tanstack/react-query";
import getCollectionData from "../utils/functions/getCollectionData";
import { useAppSelector } from "../utils/types/reactReduxHooks";
import { FilterState, GeoLocationStateProp } from "../utils/types/slicesState";
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

const Collection = () => {
  const locationsList = useAppSelector(
    (store) => store.geoLocation.currentLocations
  ) as GeoLocationStateProp[];
  const { sortConfig, facets }: FilterState = useAppSelector(
    (store) => store.filter
  );
  const { pathParams, title } = useAppSelector((store) => store.collection);
  const [collectionId, , tagsParam, typeParam] = pathParams.match(
    /(?<=[=])[^&]+/g
  ) || ["", "", "", ""];
  const { data, status, error } = useQuery({
    queryKey: [
      "collection",
      locationsList[locationsList.length - 1].geometry.lat,
      collectionId,
      sortConfig.sortKey,
      JSON.stringify(facets),
    ],
    queryFn: () =>
      getCollectionData(
        locationsList[locationsList.length - 1].geometry.lat,
        locationsList[locationsList.length - 1].geometry.lng,
        pathParams,
        sortConfig.sortKey,
        facets
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
        <h2 className="text-4xl font-semibold sec:text-2xl">{title}</h2>
        <p className="text-lg font-semibold text-stone-400">
          {
            data!.data.cards.find((e) => isCollectionInfo(e))?.card.card
              .description
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
                [] as (ResData | ResData2)[]
              ),
          ]}
        />
      }
    </div>
  );
};

export default Collection;
