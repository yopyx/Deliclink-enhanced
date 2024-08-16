import { useRef, useState } from "react";
import main from "/main.jpg";
import { LOCATION_ICON } from "../utils/constants";

const LandingPage = () => {
  const searchText = useRef<HTMLInputElement>(null);
  return (
    <div className="">
      <div className="flex justify-between mx-36 rounded-2xl shadow-lg bg-stone-400 bg-opacity-30">
        <div className="w-3/5 p-14 flex flex-col justify-evenly space-y-8">
          <div className="flex gap-x-3">
            <h2 className="font-semibold font-sans text-[30px]">
              Only a few clicks to place{" "}
              <span className="text-orange-600 font-bold">your order</span>
            </h2>
            <div className="flex h-max">
              <img
                id="cart"
                src={LOCATION_ICON}
                className="h-12 -mt-4 bg-blend-hue"
                alt="location symbol"
              />
            </div>
          </div>
          <div className="space-y-5">
            <h3 className="text-lg text-slate-500 font-semibold">
              Order your favourite food from restaurants near you
            </h3>
            <div className="flex">
              <div className="flex flex-col w-3/5">
                <input
                  type="text"
                  ref={searchText}
                  placeholder="Enter your delivery location"
                  className="p-2 border-orange-600 border-2"
                />
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
                <p>{e}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/3 flex overflow-x-hidden shadow-lg">
          <img src={main} alt="background" className="object-cover" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
