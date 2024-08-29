import { useState } from "react";
import { FilterBarProps } from "../utils/types/props";
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
  return (
    <div className="flex space-x-3 ml-5 font-semibold h-9">
      {viewFilter && (
        <FilterOption
          info={info}
          handleView={setViewFilter}
          sortConfig={sortConfig}
          facet={facet}
        />
      )}
      <button
        className="px-2 py-1 border-2 rounded-full bg-slate-100 bg-opacity-50 space-x-2 hover:bg-orange-300"
        onClick={() => setViewFilter(true)}
      >
        <img
          alt="filter"
          src={"/filter-circle-svgrepo-com.svg"}
          className="h-4 inline"
        />
        <span>Filter</span>
      </button>
      <div className="space-y-1">
        <button
          className="px-2 py-1 border-2 rounded-full bg-slate-100 bg-opacity-50 space-x-2 hover:bg-orange-300"
          onClick={() => setViewSort(!viewSort)}
        >
          <img
            alt="down arrow"
            src={"/arrow-down-svgrepo-com.svg"}
            className="h-4 inline"
          />
          <span>
            {sortConfig.sortTitle === "Relevance(Default)"
              ? "Sort by"
              : sortConfig.sortTitle}
          </span>
        </button>
        {viewSort && (
          <div className="absolute font-light space-y-1 flex flex-col bg-gradient-to-b from-orange-300 to-orange-100 p-2 rounded-lg z-[5]">
            {info.sortConfigs.map((e) => (
              <button
                key={e?.key}
                className={
                  (sortConfig.sortKey === e.key ? "border-2 " : "") +
                  "space-x-2 text-stone-600 text-left p-1 rounded-lg"
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
        {info.facetList
          .filter((e) => e.label !== "Cuisines")
          .map((e) => (
            <button
              key={e?.id}
              className={`px-2 py-1 border-2 rounded-full bg-opacity-50 space-x-2 ${
                facet[e.id]
                  ? "bg-orange-300"
                  : "bg-slate-100 hover:bg-orange-300"
              }`}
              onClick={() =>
                facet[e.id] &&
                facet[e.id].some((f) => f.value === e.facetInfo?.[0].id)
                  ? dispatch(removeFacet([e.id, e.facetInfo?.[0].id]))
                  : dispatch(addFacet([e.id, e.facetInfo?.[0].id]))
              }
            >
              {e?.facetInfo?.[0]?.label}
            </button>
          ))}
      </>
    </div>
  );
};

export default FilterBar;
