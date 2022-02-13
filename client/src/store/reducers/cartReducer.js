import {createSlice, current} from '@reduxjs/toolkit';
import {saveToLS, getFromLS} from '../../utils/localStorage';

const initialState = {
  cartItems: getFromLS('cart') || [],
  cartSum: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToTheCart(state, action) {
      console.log(action.payload);
      const index = state.cartItems.findIndex((elem) => elem.itemNo === action.payload.itemNo);
      if (index === -1) {
        const newItem = {...action.payload, count: 1};
        state.cartItems.push(newItem);
        console.log(state.cartItems, 'state.cartItems.push(newItem)');
        saveToLS('cart', state.cartItems);
        return;
      }
      state.cartItems[index].count += 1;
      saveToLS('cart', state.cartItems);
    },
    removeItemFromTheCart(state, action) {
      const index = state.cartItems.findIndex((elem) => elem.itemNo === action.payload);
      if (index === -1) {
        return;
      }
      state.cartItems.splice(index, 1);
      saveToLS('cart', state.cartItems);
    },
    makeLessItem(state, action) {
      const index = state.cartItems.findIndex((elem) => elem.itemNo === action.payload);

      if (state.cartItems[index].count === 1) {
        return;
      }
      state.cartItems[index].count -= 1;
      saveToLS('cart', state.cartItems);
    },
    makeMoreItem(state, action) {
      const index = state.cartItems.findIndex((elem) => elem.itemNo === action.payload);
      state.cartItems[index].count += 1;
      saveToLS('cart', state.cartItems);
    },
    countCartSum(state) {
      let sum = 0;
      state.cartItems.forEach((element) => (sum += element.currentPrice * element.count));
      state.cartSum = sum;
    },
  },
});

export const {addItemToTheCart, removeItemFromTheCart, makeMoreItem, makeLessItem, countCartSum} =
  cartSlice.actions;
export default cartSlice.reducer;
