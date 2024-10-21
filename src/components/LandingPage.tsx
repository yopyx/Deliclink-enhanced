import main from "/main.jpg";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../utils/types/reactReduxHooks";
import { addLocationGeometry } from "../utils/redux/geoLocationsSlice";
import Footer from "./Footer";
import GeoSearch from "./GeoSearch";

const LandingPage = () => {
  const dispatch = useAppDispatch();
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
            <GeoSearch />
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
