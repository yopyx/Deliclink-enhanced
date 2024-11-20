import logo from "/deliclink-logo11.png";
import cart from "/cart.png";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../utils/types/reactReduxHooks";
import { GeoLocationStateProp } from "../utils/types/slicesState";
import GeoSearch from "./GeoSearch";

const Header = () => {
  const { pathname } = useLocation();
  const locationsList = useAppSelector(
    (store) => store.geoLocation.currentLocations
  ) as GeoLocationStateProp[];
  const { items } = useAppSelector((store) => store.cart);
  return pathname === "/" ? (
    <div className="grid grid-flow-col justify-between mx-40 lp-sub2:mx-4">
      <div className="w-48 mobile:w-32 grid-cols-6 cursor-pointer">
        <img src={logo} alt="logo" className="object-cover" />
      </div>
      <div className="grid-cols-6 w-max h-max my-12 mobile:my-8 flex space-x-1 px-2 py-1 text-white bg-orange-600 rounded-lg border-white border-2 duration-200 hover:bg-stone-300 hover:text-black">
        <img
          src={"/user-avatar-filled.svg"}
          alt="profile"
          className="w-8 h-8 opacity-50 mobile:h-5 mobile:w-5"
          referrerPolicy="no-referrer"
        />
        <button className="text-sm mobile:text-[9px]">Signup / Login</button>
      </div>
    </div>
  ) : (
    <div
      className={`grid grid-flow-col justify-between px-14 h-20 sticky top-0 bg-sunset shadow-3xl font-medium z-20 ${
        ["/restaurants", "/cart", "/search"].includes(pathname)
          ? "lg-h:w-[950px] md-h:w-[950px]"
          : "lg-h:header-lg md-h:header-md"
      }`}
    >
      <div className="grid-cols-6">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="object-cover cursor-pointer absolute h-32 -mt-7 lg-h:logo-lg md-h:logo-md"
          />
        </Link>
      </div>
      <div className="flex items-center grid-cols-6">
        <ul className="flex cursor-pointer md-h:header-list-md">
          <Link to={`/city/${locationsList[locationsList.length - 1].city}`}>
            <li className="px-6 py-7 bg-main-orange-hover hover:text-white">
              Home
            </li>
          </Link>
          <li className="text-nowrap px-6 py-5">
            <GeoSearch />
          </li>
          <Link to="/cart">
            <li className="px-6 py-7 bg-main-orange-hover text-st_orange hover:text-white">
              <div className="flex w-full h-6">
                <span>
                  {Object.values(items).reduce((a, c) => a + c.num, 0) || ""}
                </span>
                <img
                  id="cart"
                  src={cart}
                  className="ml-1 -mb-6 h-6"
                  alt="cart"
                  referrerPolicy="no-referrer"
                />
              </div>
            </li>
          </Link>
          <Link to="/search">
            <li className="flex gap-x-3 px-6 py-7 bg-main-orange-hover hover:text-white">
              <span className="text-2xl -my-1 -rotate-90">⌕</span>{" "}
              <span className="lg:hidden">Search</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
