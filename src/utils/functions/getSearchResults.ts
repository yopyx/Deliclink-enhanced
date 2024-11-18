import { SearchResults } from "../types/fetchedData";
import { FacetInDetail } from "../types/slicesState";

const getSearchResults = async (
  lat: string,
  lng: string,
  query: string,
  meta: string,
  displayLabel: string,
  sortKey: string,
  facets: FacetInDetail
) => {
  sortKey =
    displayLabel === "RESTAURANT" ||
    sortKey === "relevance" ||
    sortKey === "NONE"
      ? ""
      : sortKey;
  const facet =
    displayLabel === "RESTAURANT" || JSON.stringify(facets) === "{}"
      ? ""
      : "&facets{" +
        Object.keys(facets)
          .map(
            (e) =>
              `"${e}":[` +
              facets[e]
                .map(
                  (x) =>
                    `{"id":"${x.id}","operator":"${x.operator}","label":"${x.label}}"`
                )
                .join(",") +
              "]"
          )
          .join(",") +
        "}";
  const url =
    import.meta.env.VITE_ENVIRONMENT === "production"
      ? `https://deliclink.vercel.app/search-results?lat=${lat}&lng=${lng}&query=${query}$meta=${encodeURIComponent(
          meta
        )}&facets=${encodeURIComponent(
          facet
        )}&sortKey=${sortKey}&displayLabel=${displayLabel}`
      : `http://localhost:3001/search-results?lat=${lat}&lng=${lng}&query=${query}$meta=${encodeURIComponent(
          meta
        )}&facets=${encodeURIComponent(
          facet
        )}&sortKey=${sortKey}&displayLabel=${displayLabel}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    return data as SearchResults;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
  }
};
export default getSearchResults;
