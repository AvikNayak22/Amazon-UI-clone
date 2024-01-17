// Import necessary functions from the Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the cart slice
const initialState = {
  products: [],         // Array to store products in the cart
  productsNumber: 0,    // Total number of products in the cart
};

// Create a Redux slice for the cart
export const cartSlice = createSlice({
  name: "cart",          // Name of the slice
  initialState,          // Initial state for the slice
  reducers: {
    // Action to add a product to the cart
    addToCart: (state, action) => {
      // Check if the product is already in the cart
      const addProductExists = state.products.find(
        (product) => product.id === action.payload.id
      );
      
      // If the product exists, increase its quantity, otherwise add it to the cart
      if (addProductExists) {
        addProductExists.quantity += parseInt(action.payload.quantity);
      } else {
        state.products.push({
          ...action.payload,
          quantity: parseInt(action.payload.quantity),
        });
      }

      // Update the total number of products in the cart
      state.productsNumber =
        state.productsNumber + parseInt(action.payload.quantity);
    },
    
    // Action to remove a product from the cart
    removeFromCart: (state, action) => {
      // Find the product to be removed from the array
      const productToRemove = state.products.find(
        (product) => product.id === action.payload
      );

      // Remove the quantity of the product from the total
      state.productsNumber = state.productsNumber - productToRemove.quantity;

      // Find the index of the product to be removed
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );

      // Remove the product from the array
      state.products.splice(index, 1);
    },
    
    // Action to increment the quantity of a product in the cart
    incrementInCart: (state, action) => {
      // Find the item to be incremented
      const itemInc = state.products.find((item) => item.id === action.payload);
      
      // If the item's quantity is greater than or equal to 1, increment it
      if (itemInc.quantity >= 1) {
        itemInc.quantity = itemInc.quantity + 1;
      }

      // Update the total number of products in the cart
      state.productsNumber = state.productsNumber + 1;
    },
    
    // Action to decrement the quantity of a product in the cart
    decrementInCart: (state, action) => {
      // Find the item to be decremented
      const itemDec = state.products.find((item) => item.id === action.payload);

      // If the item's quantity is 1, remove it from the cart, otherwise decrement it
      if (itemDec.quantity === 1) {
        const index = state.products.findIndex(
          (item) => item.id === action.payload
        );
        state.products.splice(index, 1);
      } else {
        itemDec.quantity--;
      }

      // Update the total number of products in the cart
      state.productsNumber = state.productsNumber - 1;
    },
  },
});

// Extract action creators from the slice
export const { addToCart, removeFromCart, incrementInCart, decrementInCart } =
  cartSlice.actions;

// Export the reducer function
export default cartSlice.reducer;

