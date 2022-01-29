import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToTheCart(state, action) {
      const cartItems = [...state.cartItems];
      const index = cartItems.findIndex((elem) => elem.id === action.payload.id);
      if (index === -1) {
        const newItem = {...action.payload, count: 1};
        state.cartItems.push(newItem);
        return;
      }
      cartItems[index].count += 1;
    },
    removeItemFromTheCart(state, action) {
      const cartItems = [...state.cartItems];
      const index = cartItems.findIndex((elem) => elem.id === action.payload);

      if (index === -1) {
        return;
      }
      cartItems.splice(index, 1);
    },
    makeLessItem(state, action) {
      const cartItems = [...state.cartItems];
      const index = cartItems.findIndex((elem) => elem.id === action.payload);

      if (cartItems[index].count === 1) {
        return;
      }
      cartItems[index].count -= 1;
    },
    makeMoreItem(state, action) {
      const newCartItems = [...state.cartItems];
      const index = newCartItems.findIndex((elem) => elem.id === action.payload);
      newCartItems[index].count += 1;
    },
  },
});

export const {addItemToTheCart} = cartSlice.actions;
export default cartSlice.reducer;
