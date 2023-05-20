//https://redux-toolkit.js.org/api/createSlice
import { createSlice } from '@reduxjs/toolkit';

//Initializes the state
const initialState = {
    //The cart starts empty
    isCartOpen: false,
    //Cart is an empty array
    cart: [],
    //Items array is also empty
    items: [],
}

//https://redux-toolkit.js.org/api/createSlice
export const cartSlice = createSlice({
    name: "cart", //Initialize the name
    initialState, //Grab the initialState var that's empty
    reducers: {
        //Reducer functions for each of the actions in the app
        //
        setItems: (state, action) => {
            state.items = action.payload;
        },
        //Reducer function to add items to the cart
        addToCart: (state, action) => {
            state.cart = [...state.cart, action.payload.item];            
        },

        //Reducer function to remove items from the cart
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        },

        //REducer function to increase the count in the cart
        increaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.ud === action.payload.id) {
                    item.count++;
                }
                return item;
            })
        },

        //Reducer function to decrease the count in the cart
        decreaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.ud === action.payload.id && item.count > 1) {
                    item.count--;
                }
                return item;
            })
        },
        //Reducer function to show the cart is open on the screen
        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },
    }
})

//Export the functions we've created to the app
export const {
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;