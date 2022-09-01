import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const initialState = {
  cartItems,
  amount: 4,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: state => {
      state.cartItems = [];
    },
    removeItem: (state, { payload }) => {
      const itemId = payload;
      state.cartItems = state.cartItems.filter(
        cartItem => cartItem.id !== itemId
      );
    },
    changeItemAmount: (state, { payload }) => {
      const { id: itemId, sign } = payload;
      const cartItem = state.cartItems.find(cartItem => cartItem.id === itemId);

      if (sign === "+") {
        cartItem.amount += 1;
      }

      if (sign === "-") {
        cartItem.amount -= 1;
      }
    },
  },
});

export const { clearCart, removeItem, changeItemAmount } = cartSlice.actions;

export default cartSlice.reducer;
