import { useState } from "react";
import main from "/main.jpg";
import { useQuery } from "@tanstack/react-query";
import getGeoSuggestions from "../utils/functions/getGeoSuggestions";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../utils/types/reactReduxHooks";
import { addLocationGeometry } from "../utils/redux/geoLocationsSlice";
import Footer from "./Footer";

const LandingPage = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, status, isFetching } = useQuery({
    queryKey: ["suggestions", searchText],
    queryFn: () => getGeoSuggestions(searchText),
    enabled: Boolean(searchText),
  });
  // const suggestionList = useMemo(() => {
  //   return data?.filter((e) => e.components.country === "India");
  // }, [data]);
  return (
    <div className="w-[1100px] flex flex-col mx-auto text-nowrap">
      <div className="flex mx-auto justify-between rounded-2xl shadow-lg bg-stone-400 bg-opacity-30">
        <div className="p-14 flex flex-1 flex-col space-y-14">
          <div className="flex gap-x-2">
            <h2 className="font-semibold font-sans text-[30px]">
              Only a few clicks to place{" "}
              <span className="text-orange-600 font-bold">your order . .</span>
            </h2>
            <div className="flex h-10 -mx-5">
              <img
                src={"/location-indicator.svg"}
                className="-mt-3 object-cover"
                alt="location symbol"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <h3 className="text-lg text-slate-500 font-semibold">
              Order your favourite food from restaurants near you
            </h3>
            <div className="flex">
              <div className="flex flex-col w-96">
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
                    <ul className="w-96 bg-white absolute mt-11 p-1 rounded-b-lg z-10">
                      {data!.map((e, i) => (
                        <li
                          key={e.formatted + i}
                          className="border-b-2 pb-1 hover:bg-stone-200 overflow-x-hidden cursor-pointer"
                          onClick={() => {
                            dispatch(
                              addLocationGeometry({
                                city: e.formatted,
                                geometry: {
                                  lat: String(e.bounds.northeast.lat),
                                  lng: String(e.bounds.northeast.lng),
                                },
                              })
                            );
                            navigate(
                              `/city/${e.formatted.split(",")[0].toLowerCase()}`
                            );
                          }}
                        >
                          {e.formatted}
                        </li>
                      ))}
                    </ul>
                  )
                )}
              </div>
              <button
                className="text-white h-11 bg-orange-600 p-2 duration-200 border-2 border-white border-l-0 hover:text-black hover:bg-stone-300"
                onClick={() => {
                  const dataobj = data?.find((e) => e.formatted === searchText);
                  dispatch(
                    addLocationGeometry({
                      city: dataobj?.formatted,
                      geometry: {
                        lat: String(dataobj?.bounds.northeast.lat),
                        lng: String(dataobj?.bounds.northeast.lng),
                      },
                    })
                  );
                  navigate(
                    `/city/${dataobj?.formatted.split(",")[0].toLowerCase()}`
                  );
                }}
              >
                Find nearby restaurants
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-y-3">
            <h3 className="text-lg">Cities within our reach in India</h3>
            <div className="flex flex-wrap gap-x-3 w-80 font-semibold text-stone-500">
              {[
                {
                  city: "ahmedabad",
                  geometry: { lat: "23.022505", lng: "72.5713621" },
                },
                {
                  city: "bangalore",
                  geometry: { lat: "12.9715987", lng: "77.5945627" },
                },
                {
                  city: "chennai",
                  geometry: { lat: "13.0843007", lng: "80.2704622" },
                },
                {
                  city: "delhi",
                  geometry: { lat: "28.7040592", lng: "77.10249019999999" },
                },
                {
                  city: "gurgaon",
                  geometry: { lat: "28.4594965", lng: "77.0266383" },
                },
                {
                  city: "hyderabad",
                  geometry: { lat: "17.406498", lng: "78.47724389999999" },
                },
                {
                  city: "kolkata",
                  geometry: { lat: "22.5743545", lng: "88.3628734" },
                },
                {
                  city: "mumbai",
                  geometry: { lat: "19.0759837", lng: "72.8776559" },
                },
                {
                  city: "pune",
                  geometry: { lat: "18.5204303", lng: "73.8567437" },
                },
              ].map((e) => (
                <Link
                  to={`/city/${e.city}`}
                  key={e.city}
                  onClick={() => dispatch(addLocationGeometry(e))}
                >
                  <p>{e.city[0].toUpperCase() + e.city.slice(1)}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-1 shadow-lg lg:hidden">
          <img src={main} alt="background" className="object-cover" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
