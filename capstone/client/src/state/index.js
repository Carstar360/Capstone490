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

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },

        addToCart: (state, action) => {
            state.cart = [...state.cart, action.payload.item];            
        },

        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        },

        increaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.ud === action.payload.id) {
                    item.count++;
                }
                return item;
            })
        },

        decreaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.ud === action.payload.id && item.count > 1) {
                    item.count--;
                }
                return item;
            })
        },

        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },
    }
})

export const {
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;