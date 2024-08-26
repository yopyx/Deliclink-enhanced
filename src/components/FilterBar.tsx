import { useState } from "react";
const FilterBar = () => {
  const [viewSort, setViewSort] = useState(false);
  const [viewFilter, setViewFilter] = useState(false);
  const [checkedSort, setCheckedSort] = useState("Relevance (Default)");
  return (
    <div className="flex space-x-3 ml-5 font-semibold h-9">
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
            {checkedSort === "Relevance (Default)" ? "Sort by" : checkedSort}
          </span>
        </button>
        {viewSort && (
          <div className="sticky top-3 font-light space-y-1 flex flex-col bg-gradient-to-b from-orange-300 to-orange-100 p-2 rounded-lg z-10">
            {[].sortConfigs.map((e) => (
              <button
                key={e?.key}
                className={
                  (checkedSort === e.title ? "border-2 " : "") +
                  "space-x-2 text-stone-600 text-left p-1 rounded-lg"
                }
                onClick={() => setCheckedSort(e.title)}
              >
                {e.title}
              </button>
            ))}
          </div>
        )}
      </div>
      <>
        {[].map((e) => (
          <button
            key={e?.id}
            className="px-2 py-1 border-2 rounded-full bg-slate-100 bg-opacity-50 space-x-2 hover:bg-orange-300"
          >
            {e?.facetInfo[0]?.label}
          </button>
        ))}
      </>
    </div>
  );
};

export default FilterBar;
