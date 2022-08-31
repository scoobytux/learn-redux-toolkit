import { configureStore } from "@reduxjs/toolkit";

// Reducers
import cartReducer from "./features/cart/cartSlice";

export const store = configureStore({ reducer: { cart: cartReducer } });
