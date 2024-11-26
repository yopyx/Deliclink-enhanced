import { useNavigate } from "react-router-dom";
import { CitiesProps } from "../utils/types/props";
import { useAppDispatch } from "../utils/types/reactReduxHooks";
import { useQuery } from "@tanstack/react-query";
import getGeoSuggestions from "../utils/functions/getGeoSuggestions";
import { addLocationGeometry } from "../utils/redux/geoLocationsSlice";
import { useEffect, useState } from "react";

const Cities = ({ info }: CitiesProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("");
  const { data } = useQuery({
    queryKey: ["city link", selectedCity],
    queryFn: () => getGeoSuggestions(selectedCity),
    enabled: Boolean(selectedCity),
  });
  useEffect(() => {
    if (data?.[0]) {
      dispatch(
        addLocationGeometry({
          city: selectedCity.toLowerCase(),
          geometry: {
            lat: String(data[0].bounds.northeast.lat),
            lng: String(data[0].bounds.northeast.lng),
          },
        })
      );
      navigate(`/city/${data[0].formatted.split(",")[0].toLowerCase()}`);
    }
  }, [dispatch, data, navigate, selectedCity]);
  return (
    <div className="w-[90%] flex flex-col gap-y-4 bg-sunset">
      <h3 className="text-xl font-semibold lg:text-lg">
        Servicable cities locations
      </h3>
      <div className="h-60 p-3 overflow-y-scroll mx-auto ml-0 flex flex-wrap gap-2">
        {info.cities.map((e) => (
          <button
            type="button"
            key={e.text}
            onClick={() => {
              setSelectedCity(e.text);
            }}
            className="px-1 text-gray-500 rounded-full border-2 hover:bg-orange-200"
          >
            {e.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Cities;
