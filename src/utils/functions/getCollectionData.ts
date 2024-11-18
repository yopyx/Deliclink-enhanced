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
    import.meta.env.VITE_ENVIRONMENT === "production"
      ? `https://deliclink.vercel.app/collection?lat=${lat}&lng=${lng}&params=${params}&sortKey=${sortKey}&facet=${facet}`
      : `http://localhost:3001/collection?lat=${lat}&lng=${lng}&params=${params}&sortKey=${sortKey}&facet=${facet}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(JSON.stringify(data));
    return data as CollectionData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
// const getCollectionData = async (
//   lat: string,
//   lng: string,
//   params: string,
//   sortKey: string,
//   facets: Facet
// ) => {
//   sortKey = sortKey === "relevance" ? "" : sortKey;
//   const facet = Object.keys(facets)
//     .map((e) =>
//       facets[e].map((x, i) => `&facets[${e}][${i}][value]=${x.value}`).join("")
//     )
//     .join("");
//   const url =
//     CORS + encodeURIComponent(COLLECTION_API(lat, lng, params, sortKey, facet));
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data);
//     return data as CollectionData;
//   } catch (error) {
//     console.error("Error fetching restaurants:", error);
//   }
// };
export default getCollectionData;
