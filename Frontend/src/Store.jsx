import React, { createContext, useReducer } from 'react';

// Create context for the global state
export const Store = createContext();

// Initial state for the store
const initialState = {
  cart: {
    cartItems: [], // Array to hold the items in the cart
  },
};

// Reducer function to handle actions related to the cart
function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find((item) => item._id === newItem._id);
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      return { ...state, cart: { ...state.cart, cartItems } };

    default:
      return state;
  }
}

// StoreProvider to wrap the app and provide global state
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
