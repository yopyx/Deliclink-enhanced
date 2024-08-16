import logo from "/deliclink-logo11.png";
import cart from "/cart.png";
import { Link, useLocation } from "react-router-dom";
import { PROFILE_ICON } from "../utils/constants";

const Header = () => {
  const { pathname } = useLocation();
  return pathname === "/" ? (
    <div className="flex justify-between my-6 mx-40">
      <div className="w-48 cursor-pointer -mt-9">
        <img src={logo} alt="logo" className="object-cover" />
      </div>
      <Link to="/signin">
        <div className="flex space-x-1 px-2 py-1 mt-3 text-white bg-orange-600 rounded-lg border-white border-2 duration-200 hover:bg-stone-300 hover:text-black">
          <img
            src={PROFILE_ICON}
            alt="profile"
            className="w-8 h-8 mix-blend-plus-lighter"
          />
          <button className="text-sm">Signup / Login</button>
        </div>
      </Link>
    </div>
  ) : (
    <div className="flex justify-between sticky top-0 bg-sunset h-20 shadow-3xl font-medium z-first">
      <div className="w-56">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="object-cover cursor-pointer -mt-10 ml-20"
          />
        </Link>
      </div>
      <div className="flex items-center">
        <ul className="flex pr-12 cursor-pointer">
          <Link to={"/"}>
            <li className="px-6 py-7 bg-main-orange-hover hover:text-white">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="px-6 py-7 bg-main-orange-hover hover:text-white">
              About Us
            </li>
          </Link>
          <Link to="/contact">
            <li className="px-6 py-7 bg-main-orange-hover hover:text-white">
              Contact Us
            </li>
          </Link>
          <Link to="/cart">
            <li className="px-6 py-7 bg-main-orange-hover text-st_orange hover:text-white">
              <div className="flex w-full h-6">
                <img
                  id="cart"
                  src={cart}
                  className="ml-1 -mb-6 h-6"
                  alt="cart"
                />
              </div>
            </li>
          </Link>
          <Link to="/signin">
            <li className="px-6 py-7 bg-main-orange-hover hover:text-white">
              Signup/Login
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
