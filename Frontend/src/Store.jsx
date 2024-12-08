import { createContext, useReducer } from 'react';

// Create a Context for the global store
export const Store = createContext();

// Initial state of the app
const initialState = {
  fullBox: false,
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
  cart: {
    shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : { location: {} },
    paymentMethod: localStorage.getItem('paymentMethod') ? localStorage.getItem('paymentMethod') : '',
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  },
};

// Reducer to handle various state changes
function reducer(state, action) {
  switch (action.type) {
    case 'SET_FULLBOX_ON':
      return { ...state, fullBox: true };
    case 'SET_FULLBOX_OFF':
      return { ...state, fullBox: false };

    case 'CART_ADD_ITEM':
      // Add or update item in the cart
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find((item) => item._id === newItem._id);
      const updatedCartItems = existItem
        ? state.cart.cartItems.map((item) => (item._id === existItem._id ? newItem : item))
        : [...state.cart.cartItems, newItem];
      
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      return { ...state, cart: { ...state.cart, cartItems: updatedCartItems } };

    case 'CART_REMOVE_ITEM':
      // Remove item from cart
      const updatedCartItemsAfterRemove = state.cart.cartItems.filter((item) => item._id !== action.payload._id);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItemsAfterRemove));
      return { ...state, cart: { ...state.cart, cartItems: updatedCartItemsAfterRemove } };

    case 'CART_CLEAR':
      // Clear all cart items
      return { ...state, cart: { ...state.cart, cartItems: [] } };

    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };

    case 'USER_SIGNOUT':
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: '',
        },
      };

    case 'SAVE_SHIPPING_ADDRESS':
      return { ...state, cart: { ...state.cart, shippingAddress: action.payload } };

    case 'SAVE_SHIPPING_ADDRESS_MAP_LOCATION':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            location: action.payload,
          },
        },
      };

    case 'SAVE_PAYMENT_METHOD':
      return { ...state, cart: { ...state.cart, paymentMethod: action.payload } };

    default:
      return state;
  }
}

// Store provider to manage global state
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
