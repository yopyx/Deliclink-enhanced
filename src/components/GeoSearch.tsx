import { useState } from "react";
import { useAppDispatch } from "../utils/types/reactReduxHooks";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getGeoSuggestions from "../utils/functions/getGeoSuggestions";
import { addLocationGeometry } from "../utils/redux/geoLocationsSlice";

const GeoSearch = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchText, setSearchText] = useState("");
  const { data, status, isFetching } = useQuery({
    queryKey: ["suggestions", pathname, searchText],
    queryFn: () => getGeoSuggestions(searchText),
    enabled: Boolean(searchText),
  });
  return (
    <div className="flex">
      <div className={`flex flex-col ${pathname === "/" ? "w-96" : "w-52"}`}>
        <input
          type="text"
          value={searchText || ""}
          placeholder={`${
            pathname === "/"
              ? "ex: MG Road 12, 560001 Bangalore, India"
              : "Enter Location"
          }`}
          className="p-2 border-orange-600 border-2"
          onChange={(e) => setSearchText(e.target.value)}
        />
        {status === "pending" && isFetching ? (
          <div
            className={`${
              pathname === "/" ? "w-96" : "w-52"
            } absolute mt-11 bg-white rounded-lg flex justify-center p-1`}
          >
            <div className="spin w-4 h-4 p-2"></div>
          </div>
        ) : status === "error" || data?.length === 0 ? (
          <p
            className={`${
              pathname === "/" ? "w-96" : "w-52"
            } bg-white absolute mt-11 p-1 text-slate-500 rounded-lg`}
          >
            No results
          </p>
        ) : (
          data && (
            <ul
              className={`${
                pathname === "/" ? "w-96" : "w-52"
              } bg-white absolute mt-11 p-1 rounded-b-lg z-10`}
            >
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
      {pathname === "/" && (
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
            navigate(`/city/${dataobj?.formatted.split(",")[0].toLowerCase()}`);
          }}
        >
          Find nearby restaurants
        </button>
      )}
    </div>
  );
};

export default GeoSearch;
