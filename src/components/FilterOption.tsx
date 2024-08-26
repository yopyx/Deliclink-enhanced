import { useState } from "react";

const FilterOption = () => {
  const [viewedOption, setViewedOption] = useState("Sort");
  return (
    <div className="fixed top-0 z-20 w-screen h-screen bg-black bg-opacity-30 -ml-[16.5%]">
      <div className="bg-white sticky top-36 rounded-xl mx-auto my-auto w-2/5 p-4">
        <div className="flex justify-between font-bold text-xl text-stone-700 border-b-2 pb-1">
          <h2 className="">Filter</h2>
          <button className="bg-stone-200 rounded-full px-2">x</button>
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
              {[]?.map((e, i) => (
                <button
                  className={`text-left${
                    viewedOption === e?.label ? " text-orange-500" : ""
                  }`}
                  key={e?.id}
                  onClick={() => {
                    setViewedOption(e?.label);
                  }}
                >
                  {e?.label}
                </button>
              ))}
            </>
          </div>
          <div className="flex flex-col pl-10 h-80 w-[77%] overflow-y-scroll font-light space-y-2 text-stone-400">
            {viewedOption === "Sort"
              ? [].map((e) => (
                  <div className="flex space-x-2" key={e?.key}>
                    <input
                      type="radio"
                      name="same"
                      className="text-left accent-orange-500"
                    />
                    <label>{e?.title}</label>
                  </div>
                ))
              : [].map((e) => (
                  <div className="flex space-x-2" key={e?.id}>
                    <input
                      type="checkbox"
                      className="text-left accent-orange-500"
                    />
                    <label>{e?.label}</label>
                  </div>
                ))}
          </div>
          <button className="bg-slate-600">Apply</button>
        </div>
      </div>
    </div>
  );
};

export default FilterOption;
