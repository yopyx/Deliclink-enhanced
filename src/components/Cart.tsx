import { useRef, useState } from "react";
import { clearCart } from "../utils/redux/cartSlice";
import { useAppDispatch, useAppSelector } from "../utils/types/reactReduxHooks";
import FoodItem from "./FoodItem";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((store) => store.cart.items);
  const [currentLocation, setCurrentLocation] = useState(
    "1 Grafton Street, Dublin, Ireland"
  );
  const locationRef = useRef<HTMLInputElement>(null);
  return (
    <div className="w-[90%] mx-auto flex justify-between my-5 lg2:cart-lg2">
      <div className="w-[48%] lg2:w-[90%] flex flex-col space-y-8">
        <h1 className="w-max text-3xl sec:text-lg font-bold text-slate-900 shadow-inner shadow-orange-900 p-1">
          Checkout
        </h1>
        <div className="flex space-x-3 sec:text-xs">
          <input
            ref={locationRef}
            type="text"
            placeholder="ex: 1 Grafton Street, Dublin, Ireland"
            className="p-1.5 w-96"
          />
          <button
            className="text-nowrap border-2 p-1 bg-white/50 hover:bg-slate-200"
            onClick={() =>
              locationRef.current?.value &&
              setCurrentLocation(locationRef.current?.value)
            }
          >
            Enter Location
          </button>
        </div>
        <div className="h-[45vh]">
          <iframe
            width="100%"
            height="100%"
            src={`https://maps.google.com/maps?width=160%25&height=120%25&hl=en&q=${encodeURIComponent(
              currentLocation
            )}+()&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
          ></iframe>
        </div>
      </div>
      {!!Object.keys(cartItems).length && (
        <div className="w-[48%] lg2:w-[90%] h-96 rounded-lg bg-[#eeeeee80] my-auto">
          <h4 className="font-semibold text-xl px-2 text-orange-500">Cart</h4>
          <div className="h-96 overflow-y-scroll">
            {Object.keys(cartItems).map((item) => (
              <FoodItem
                key={cartItems[item].data.id}
                info={cartItems[item].data}
                checkout={true}
                storedItems={cartItems}
              />
            ))}
            <div className="flex justify-between h-max border-2 p-2 mt-2 bg-white">
              <h4 className="font-semibold text-lg">Total</h4>
              <h5>
                ₹
                {Object.keys(cartItems).reduce(
                  (a, c) =>
                    a +
                    (cartItems[c].num *
                      (cartItems[c].data?.price ||
                        cartItems[c].data?.defaultPrice ||
                        0)) /
                      100,
                  0
                )}
              </h5>
            </div>
          </div>
          <div className="flex p-2 justify-between">
            <button
              className="w-max px-4 py-1 bg-black text-white font-bold hover:text-black hover:bg-[#eeeeee]"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
            <button className="w-max bg-white font-semibold py-1 px-4 border-green-400 border-2 hover:bg-green-300">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
