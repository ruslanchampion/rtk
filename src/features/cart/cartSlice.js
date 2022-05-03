import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";


const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
	cartItems: [],
	amount: 4,
	total: cartItems.reduce((acc, item) => (acc += Number(item.price)), 0),
	isLoading: true,
};

export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
  return fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
});

const cartSlice = createSlice({
	name: "cart",
	initialState,
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
	reducers: {
		clearCart: (state) => {
			state.cartItems = [];
		},
		removeItem: (state, action) => {
			const itemId = action.payload;
			state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
		},
		increase: (state, { payload }) => {
			const item = state.cartItems.find((item) => item.id === payload);
			item.amount++;
			state.amount++;
			state.total += Number(item.price);
		},
		decrease: (state, { payload }) => {
			const item = state.cartItems.find((item) => item.id === payload);
			item.amount--;
			state.amount--;
			state.total -= Number(item.price);
		},
	},
});

export const { clearCart, removeItem, increase, decrease } = cartSlice.actions;

export default cartSlice.reducer;
