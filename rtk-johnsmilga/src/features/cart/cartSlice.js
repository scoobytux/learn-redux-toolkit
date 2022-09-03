import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
  return fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));
});

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
    calculateTotal: state => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach(cartItem => {
        amount += cartItem.amount;
        total += cartItem.price * cartItem.amount;
      });

      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: state => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.isLoading = false;
      state.cartItems = payload;
    },
    [getCartItems.rejected]: state => {
      state.isLoading = false;
    },
  },
});

export const { clearCart, removeItem, changeItemAmount, calculateTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
