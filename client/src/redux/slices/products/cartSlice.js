import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [], // Initialize cartItems with values from localStorage if available
  loading: false,
  error: null,
  isAdded: false,
};

const loadCartItemsFromLocalStorage = () => {
  const cartItems = localStorage.getItem("cartItems");
  return cartItems ? JSON.parse(cartItems) : [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    ...initialState,
    cartItems: loadCartItemsFromLocalStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productId === newItem.productId
      );

      if (existingItem) {
        // If the item already exists, update the quantity and total price
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        // If it doesn't exist, add it to the cart
        state.cartItems.push(newItem);
      }

      state.isAdded = true;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      // Remove the item from the cartItems array by product ID
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    changeItemQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemToUpdate = state.cartItems.find(
        (item) => item.productId === productId
      );

      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        itemToUpdate.totalPrice = itemToUpdate.price * quantity;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    resetAddedFlag: (state) => {
      state.isAdded = false;
    },
  },
});

export const { addToCart, removeFromCart, changeItemQuantity, resetAddedFlag } =
  cartSlice.actions;

const cartReducer = cartSlice.reducer;

export default cartReducer;
