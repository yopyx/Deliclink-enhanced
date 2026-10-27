import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState } from "../types/slicesState";
import { DishInfo } from "../types/fetchedData";

type DishRef = { res: string; id: string };
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartData: {},
    itemsCount: 0,
    totalPrice: 0,
  } as CartState,
  reducers: {
    addItem: (
      state: CartState,
      action: PayloadAction<DishRef & { data: DishInfo }>,
    ) => {
      const { res, id, data } = action.payload;
      if (state.cartData?.[res]?.[id]) {
        state.cartData[res][id].num++;
      } else if (state.cartData?.[res]) {
        state.cartData[res][id] = { data, num: 1 };
      } else {
        state.cartData[res] = {};
        state.cartData[res][id] = { data, num: 1 };
      }
      state.itemsCount++;
      state.totalPrice += data?.price;
    },
    removeItem: (state: CartState, action: PayloadAction<DishRef>) => {
      const { res, id } = action.payload;
      const dish = state.cartData?.[res]?.[id];
      if (dish?.num > 1) {
        dish.num--;
      } else {
        if (Object.keys(state.cartData?.[res]).length == 1) {
          delete state.cartData?.[res];
        } else {
          delete state.cartData?.[res]?.[id];
        }
      }
      state.itemsCount--;
      state.totalPrice -= dish?.data?.price;
    },
    removeItemGroup: (state: CartState, action: PayloadAction<DishRef>) => {
      const { res, id } = action.payload;
      const dish = state.cartData?.[res]?.[id];
      const count = dish?.num;
      const totalPrice = dish?.num * dish?.data?.price;
      delete state.cartData?.[res]?.[id];
      if (Object.keys(state.cartData[res]).length == 0) {
        delete state.cartData?.[res];
      }
      state.itemsCount -= count;
      state.totalPrice -= totalPrice;
    },
    clearCart: (state: CartState) => {
      state.cartData = {};
      state.itemsCount = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, removeItemGroup, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
