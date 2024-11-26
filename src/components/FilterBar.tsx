import { useState } from "react";
import { FilterBarProps, MappedFacet } from "../utils/types/props";
import FilterOption from "./FilterOption";
import { useAppDispatch } from "../utils/types/reactReduxHooks";
import {
  addFacet,
  addSortConfig,
  removeFacet,
} from "../utils/redux/filterSlice";
const FilterBar = ({ info, sortConfig, facet }: FilterBarProps) => {
  const dispatch = useAppDispatch();
  const [viewSort, setViewSort] = useState(false);
  const [viewFilter, setViewFilter] = useState(false);
  const [filterCount, setFilterCount] = useState(0);
  const facetObj = info.facetList
    .filter((e) => e.label !== "Cuisines")
    .reduce((a, c) => {
      if (a[c.label]) {
        a[c.label].facetInfo = [
          ...(a[c.label].facetInfo || []),
          ...(c.facetInfo || []),
        ];
      } else {
        a[c.label] = c;
      }
      return a;
    }, {} as MappedFacet);
  return (
    <div className="w-[85%] lg:text-xs flex space-x-3 font-semibold h-9 lg:filter-lg">
      {viewFilter && (
        <div className="md:hidden">
          <FilterOption
            info={info}
            handleView={setViewFilter}
            sortConfig={sortConfig}
            facet={facet}
            facetObj={facetObj}
          />
        </div>
      )}
      <button
        className="w-max px-2 py-1 lg:py-2 flex text-nowrap border-2 rounded-full bg-slate-100 bg-opacity-50 gap-x-2 hover:bg-orange-300 md:hidden"
        onClick={() => setViewFilter(true)}
      >
        <img
          alt="filter"
          src={"/filter-circle-svgrepo-com.svg"}
          className="h-4 my-auto"
        />
        <span className="">Filter</span>
        {filterCount ? (
          <div className="rounded-full bg-orange-300 border-2 px-2">
            {filterCount}
          </div>
        ) : (
          ""
        )}
      </button>
      <div className="space-y-1">
        <button
          className="w-max px-2 py-1 lg:py-2 flex text-nowrap border-2 rounded-full bg-slate-100 bg-opacity-50 gap-x-2 hover:bg-orange-300"
          onClick={() => setViewSort(!viewSort)}
        >
          <img
            alt="down arrow"
            src={"/arrow-down-svgrepo-com.svg"}
            className="h-4 my-auto"
          />
          <span className="">
            {sortConfig.sortTitle.startsWith("Relevance")
              ? "Sort by"
              : sortConfig.sortTitle}
          </span>
        </button>
        {viewSort && (
          <div className="absolute z-10 font-light space-y-1 flex flex-col bg-gradient-to-b from-orange-300 to-orange-100 p-2 rounded-lg">
            {info.sortConfigs.map((e, i) => (
              <button
                key={e?.key + i}
                className={
                  (sortConfig.sortKey === e.key ||
                  (sortConfig.sortKey === "relevance" && e.key === "NONE")
                    ? "border-2 "
                    : "") + "space-x-2 text-stone-600 text-left p-1 rounded-lg"
                }
                onClick={() => {
                  dispatch(
                    addSortConfig({ sortTitle: e.title, sortKey: e.key })
                  );
                }}
              >
                {e.title}
              </button>
            ))}
          </div>
        )}
      </div>
      <>
        {Object.keys(facetObj).map(
          (e) =>
            facetObj[e].facetInfo?.[0] && (
              <button
                key={facetObj[e].id}
                className={`px-2 py-1 text-nowrap border-2 rounded-full bg-opacity-50 space-x-2 ${
                  facet[facetObj[e].id]
                    ? "bg-orange-300"
                    : "bg-slate-100 hover:bg-orange-300"
                }`}
                onClick={() => {
                  if (
                    facet[facetObj[e].id] &&
                    facet[facetObj[e].id].some(
                      (f) => f.value === facetObj[e].facetInfo?.[0].id
                    )
                  ) {
                    dispatch(
                      removeFacet([
                        facetObj[e].id,
                        facetObj[e].facetInfo?.[0].id,
                      ])
                    );
                    setFilterCount(filterCount ? filterCount - 1 : 0);
                  } else {
                    dispatch(
                      addFacet([facetObj[e].id, facetObj[e].facetInfo?.[0]])
                    );
                    setFilterCount(filterCount + 1);
                  }
                }}
              >
                {facetObj[e].facetInfo?.[0]?.label}
              </button>
            )
        )}
      </>
    </div>
  );
};

export default FilterBar;
