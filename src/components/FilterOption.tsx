import { useState } from "react";
import { FilterOptionProps } from "../utils/types/props";
import { useAppDispatch } from "../utils/types/reactReduxHooks";
import {
  addFacet,
  addSortConfig,
  removeFacet,
} from "../utils/redux/filterSlice";

const FilterOption = ({
  info,
  handleView,
  sortConfig,
  facet,
  facetObj,
}: FilterOptionProps) => {
  const dispatch = useAppDispatch();
  const [viewedOption, setViewedOption] = useState("Sort");
  return (
    <div className="fixed top-0 w-screen h-screen z-20 -ml-[16.5%]">
      <div className="bg-white sticky top-36 rounded-xl mx-auto my-auto w-2/5 p-4 z-30">
        <div className="flex justify-between font-bold text-xl text-stone-700 border-b-2 pb-1">
          <h2 className="">Filter</h2>
          <button
            className="bg-stone-200 rounded-full px-2"
            onClick={() => handleView(false)}
          >
            x
          </button>
        </div>
        <div className="flex m-2">
          <div className="flex flex-col space-y-4 font-semibold text-stone-500 border-r-2 pr-5">
            <button
              className={`text-left${
                viewedOption === "Sort" ? " text-orange-500" : ""
              }`}
              onClick={() => {
                setViewedOption("Sort");
              }}
            >
              Sort
            </button>
            <>
              {Object.keys(facetObj).map((e) => (
                <button
                  className={`text-left${
                    viewedOption === facetObj[e].label ? " text-orange-500" : ""
                  }`}
                  key={facetObj[e]?.id}
                  onClick={() => {
                    setViewedOption(facetObj[e].label);
                  }}
                >
                  {facetObj[e].label}
                </button>
              ))}
            </>
          </div>
          <div className="flex flex-col pl-10 h-80 w-[77%] overflow-auto font-light space-y-2 text-stone-400">
            {viewedOption === "Sort"
              ? info.sortConfigs.map((e) => (
                  <div className="flex space-x-2" key={e?.key}>
                    <input
                      type="radio"
                      name="same"
                      defaultChecked={sortConfig.sortKey === e.key}
                      className="text-left accent-orange-500"
                      onClick={() =>
                        dispatch(
                          addSortConfig({ sortKey: e.key, sortTitle: e.title })
                        )
                      }
                    />
                    <label>{e?.title}</label>
                  </div>
                ))
              : Object.keys(facetObj).map((x, i) => (
                  <div
                    key={JSON.stringify(facetObj[x].id)}
                    className={`flex flex-col${i > 1 ? " absolute" : ""}`}
                  >
                    {facetObj[x]?.facetInfo?.map((y, j) => (
                      <div
                        className={`flex space-x-2${
                          viewedOption === facetObj[x].label ? "" : " hidden"
                        }`}
                        key={y.id + j}
                      >
                        <input
                          type="checkbox"
                          className="text-left accent-orange-500"
                          defaultChecked={facet?.[facetObj[x].id]?.some(
                            (e) => e.value === y.id
                          )}
                          onClick={(e) =>
                            e.currentTarget.checked
                              ? dispatch(addFacet([facetObj[x].id, y]))
                              : dispatch(removeFacet([facetObj[x].id, y.id]))
                          }
                        />
                        <label>{y?.label}</label>
                      </div>
                    ))}
                  </div>
                ))}
          </div>
        </div>
      </div>
      <div
        className={`${"-left-9 "}absolute top-0 w-[110%] h-screen bg-black bg-opacity-30`}
        onClick={() => handleView(false)}
      ></div>
    </div>
  );
};

export default FilterOption;
