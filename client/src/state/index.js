import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], cart: [], isCartOpen: false },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
      // return {...state,items:action.payload};
    },

    addToCart: (state, action) => {
      console.log("inside redux", action);
      state.cart = [...state.cart, action.payload];
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },

    increaseQty: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload) {
          item.qty++;
        }
        return item;
      });
    },

    decreaseQty: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload && item.qty > 1) {
          item.qty--;
        }
        return item;
      });
    },

    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
