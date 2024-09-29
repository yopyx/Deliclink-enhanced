import { useQuery } from "@tanstack/react-query";
import getCollectionData from "../utils/functions/getCollectionData";
import { useAppSelector } from "../utils/types/reactReduxHooks";
import { FilterState, GeoLocationStateProp } from "../utils/types/slicesState";
import { isCollectionInfo, isSortCard } from "../utils/constants";
import FilterBar from "./FilterBar";
import CollectionCardsContainer from "./CollectionCardsContainer";
import CollectionShimmer from "./shimmer/CollectionShimmer";

const Collection = () => {
  const { geometry } = useAppSelector(
    (store) => store.geoLocation.currentLocation
  ) as GeoLocationStateProp;
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
      geometry.lat,
      collectionId,
      sortConfig.sortKey,
      JSON.stringify(facets),
    ],
    queryFn: () =>
      getCollectionData(
        geometry.lat,
        geometry.lng,
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
    <div className="w-[85%] my-14 mx-auto mr-0 flex flex-col space-y-10">
      <div className="flex flex-col gap-7">
        <h2 className="text-4xl font-semibold">{title}</h2>
        <p className="text-lg font-semibold text-stone-400">
          {
            data!.data.cards.find((e) => isCollectionInfo(e))?.card.card
              .description
          }
        </p>
      </div>
      {data!.data.cards.find((e) => isSortCard(e)) && <FilterBar />}
      {<CollectionCardsContainer />}
    </div>
  );
};

export default Collection;
