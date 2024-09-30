import { createSlice } from "@reduxjs/toolkit";
import { CartState } from "../types/slicesState";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {},
  } as CartState,
  reducers: {
    addItem: (state: CartState, action) => {
      if (state.items[action.payload.id]) {
        state.items[action.payload.id].num++;
      } else {
        state.items[action.payload.id] = { data: action.payload, num: 1 };
      }
    },
    removeItem: (state: CartState, action) => {
      if (state.items[action.payload.id].num > 1) {
        state.items[action.payload.id].num--;
      } else {
        delete state.items[action.payload.id];
      }
    },
    removeItemGroup: (state: CartState, action) => {
      delete state.items[action.payload.id];
    },
    clearCart: (state: CartState) => {
      state.items = {};
    },
  },
});

export const { addItem, removeItem, removeItemGroup, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
