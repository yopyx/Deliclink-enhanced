import { useState } from "react";
import main from "/main.jpg";
import { useQuery } from "@tanstack/react-query";
import getGeoSuggestions from "../utils/functions/getGeoSuggestions";

const LandingPage = () => {
  const [searchText, setSearchText] = useState("");
  const { data, status, isFetching } = useQuery({
    queryKey: ["suggestions", searchText],
    queryFn: () => getGeoSuggestions(searchText),
    enabled: Boolean(searchText),
  });
  // const suggestionList = useMemo(() => {
  //   return data?.filter((e) => e.components.country === "India");
  // }, [data]);
  return (
    <div className="flex justify-between mx-36 rounded-2xl shadow-lg bg-stone-400 bg-opacity-30">
      <div className="w-3/5 p-14 flex flex-col justify-evenly space-y-8">
        <div className="flex gap-x-2">
          <h2 className="font-semibold font-sans text-[30px]">
            Only a few clicks to place{" "}
            <span className="text-orange-600 font-bold">your order</span>
          </h2>
          <div className="flex h-max">
            <img
              src={"/location-indicator.svg"}
              className="h-12 -mt-3"
              alt="location symbol"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <div className="space-y-5">
          <h3 className="text-lg text-slate-500 font-semibold">
            Order your favourite food from restaurants near you
          </h3>
          <div className="flex">
            <div className="flex flex-col w-[61%]">
              <input
                type="text"
                value={searchText}
                placeholder="ex: MG Road 12, 560001 Bangalore, India"
                className="p-2 border-orange-600 border-2"
                onChange={(e) => setSearchText(e.target.value)}
              />
              {status === "pending" && isFetching ? (
                <div className="w-full bg-white rounded-lg flex justify-center p-1">
                  <div className="spin w-4 h-4 p-2"></div>
                </div>
              ) : status === "error" || data?.length === 0 ? (
                <p className="bg-white p-1 text-slate-500 rounded-lg">
                  No results
                </p>
              ) : (
                data && (
                  <ul className="w-1/4 bg-white absolute mt-11 p-1 rounded-b-lg">
                    {data!.map((e, i) => (
                      <li
                        key={e.formatted + i}
                        className="border-b-2 pb-1 hover:bg-stone-200 overflow-x-hidden cursor-pointer"
                        onClick={() => setSearchText(e.formatted)}
                      >
                        {e.formatted}
                      </li>
                    ))}
                  </ul>
                )
              )}
            </div>
            <button className="text-white h-11 bg-orange-600 p-2 duration-200 border-2 border-white border-l-0 hover:text-black hover:bg-stone-300">
              Find nearby restaurants
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-y-3">
          <h3 className="text-lg">Cities within our reach in India</h3>
          <div className="flex flex-wrap gap-x-3 w-3/5 font-semibold text-stone-500">
            {[
              "Ahmedabad",
              "Bangalore",
              "Chennai",
              "Delhi",
              "Gurgaon",
              "Hyderabad",
              "Kolkata",
              "Mumbai",
              "Pune",
            ].map((e) => (
              <p key={e}>{e}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="w-1/3 flex overflow-x-hidden shadow-lg">
        <img src={main} alt="background" className="object-cover" />
      </div>
    </div>
  );
};

export default LandingPage;
