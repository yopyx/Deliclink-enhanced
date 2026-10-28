import { useState } from "react";
import { useAppDispatch } from "../utils/types/reactReduxHooks";
import { useLocation, useNavigate } from "react-router";
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
    <div className="flex mobile:text-[10px]">
      <div
        className={`flex flex-col ${
          pathname === "/"
            ? "w-96 md-h:w-60 mobile:w-40"
            : "w-52 md-h:w-40 mobile:w-20"
        }`}
      >
        <input
          type="text"
          value={searchText || ""}
          placeholder={`${
            pathname === "/"
              ? "ex: MG Road 12, 560001 Bangalore, India"
              : "Enter Location"
          }`}
          className={`p-1 border-orange-600 border-2${
            pathname !== "/" ? " sec:geo-input-md-h" : ""
          }`}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter" && data) {
              dispatch(addLocationGeometry(data[0]));
              navigate(
                `/city/${data[0].city}?lat=${data[0].geometry.lat}&lng=${data[0].geometry.lng}`,
              );
            }
          }}
        />
        {status === "pending" && isFetching ? (
          <div
            className={`${
              pathname === "/"
                ? "w-96 md-h:w-60 mobile:w-40"
                : "w-52 md-h:w-40 mobile:w-20"
            } absolute mt-9 bg-white rounded-b-lg flex justify-center p-1 sec:geo-suggestions-md-h`}
          >
            <div className="spin w-4 h-4 p-1"></div>
          </div>
        ) : status === "error" || data?.length === 0 ? (
          <p
            className={`${
              pathname === "/"
                ? "w-96 md-h:w-60 mobile:w-40"
                : "w-52 md-h:w-40 mobile:w-20"
            } bg-white absolute mt-9 p-1 text-slate-500 rounded-b-lg sec:geo-suggestions-md-h`}
          >
            No results
          </p>
        ) : (
          data && (
            <ul
              className={`${
                pathname === "/"
                  ? "w-96 md-h:w-60 mobile:w-40"
                  : "w-52 md-h:w-40 mobile:w-20"
              } bg-white absolute mt-9 p-1 rounded-b-lg z-10 h-24 overflow-y-scroll sec:geo-suggestions-md-h`}
            >
              {data!.map((e) => (
                <li
                  key={e.city}
                  className="border-b-2 pb-1 hover:bg-stone-200 overflow-x-hidden cursor-pointer"
                  onClick={() => {
                    dispatch(addLocationGeometry(e));
                    navigate(
                      `/city/${e.city}?lat=${e.geometry.lat}&lng=${e.geometry.lng}`,
                    );
                  }}
                >
                  {e.city}
                </li>
              ))}
            </ul>
          )
        )}
      </div>
      {/* {pathname === "/" && (
        <button
          className="text-white mobile:h-auto bg-orange-600 p-1 duration-200 border-2 border-white border-l-0 hover:text-black hover:bg-stone-300"
          onClick={() => {
            const dataobj = data?.find((e) => e.formatted === searchText);
            dispatch(
              addLocationGeometry({
                city: dataobj?.formatted,
                geometry: {
                  lat: String(dataobj?.bounds.northeast.lat),
                  lng: String(dataobj?.bounds.northeast.lng),
                },
              }),
            );
            navigate(`/city/${dataobj?.formatted.split(",")[0].toLowerCase()}`);
          }}
        >
          Find nearby restaurants
        </button>
      )} */}
    </div>
  );
};

export default GeoSearch;
