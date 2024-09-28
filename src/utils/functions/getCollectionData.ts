import { COLLECTION_API, CORS } from "../constants";
import { CollectionData } from "../types/fetchedData";
import { Facet } from "../types/slicesState";

const getCollectionData = async (
  lat: string,
  lng: string,
  params: string,
  sortKey: string,
  facets: Facet
) => {
  sortKey = sortKey === "relevance" ? "" : sortKey;
  const facet = Object.keys(facets)
    .map((e) =>
      facets[e].map((x, i) => `&facets[${e}][${i}][value]=${x.value}`).join("")
    )
    .join("");
  const url =
    CORS + encodeURIComponent(COLLECTION_API(lat, lng, params, sortKey, facet));
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data as CollectionData;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
  }
};
export default getCollectionData;
