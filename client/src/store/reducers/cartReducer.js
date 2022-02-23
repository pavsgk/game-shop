import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  createRequestOnTheServer,
  requestThePresenceOfTheCartOnTheServer,
  requestAddProductToTheCart,
  requestToDecreaseProductQuantity,
  requestToDeleteProductFromTheCart,
} from '../../api/cart';
import {getFromLS, saveToLS} from '../../utils/localStorage';

const initialState = {
  products: [],
  cartSum: 0,
};

export const getCartFromServer = createAsyncThunk('cart/get', async () => {
  const result = await requestThePresenceOfTheCartOnTheServer();
  return result.products;
});

export const addProductToTheCart = createAsyncThunk('cart/add', async (_id) => {
  const result = await requestAddProductToTheCart(_id);
  return result.data.products;
});

export const decreaseProductQuantity = createAsyncThunk('cart/decrease', async (_id) => {
  const result = await requestToDecreaseProductQuantity(_id);
  return result.data.products;
});

export const deleteProductFromTheCart = createAsyncThunk('cart/delete', async (_id) => {
  const result = await requestToDeleteProductFromTheCart(_id);
  return result.data.products;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToTheCartForNotLog(state, action) {
      const index = state.products.findIndex(
        (elem) => elem.product.itemNo === action.payload.itemNo,
      );
      if (index === -1) {
        const newItem = {product: action.payload, cartQuantity: 1};
        state.products.push(newItem);
        saveToLS('cart', state.products);
        return;
      }
      state.products[index].cartQuantity += 1;
      saveToLS('cart', state.products);
    },
    removeItemFromTheCartForNotLog(state, action) {
      const index = state.products.findIndex((elem) => elem.product.itemNo === action.payload);
      if (index === -1) {
        return;
      }
      state.products.splice(index, 1);
      saveToLS('cart', state.products);
    },
    makeLessItemForNotLog(state, action) {
      const index = state.products.findIndex((elem) => elem.product.itemNo === action.payload);

      if (state.products[index].cartQuantity === 1) {
        return;
      }
      state.products[index].cartQuantity -= 1;
      saveToLS('cart', state.products);
    },
    makeMoreItemForNotLog(state, action) {
      const index = state.products.findIndex((elem) => {
        return elem.product.itemNo === action.payload;
      });
      state.products[index].cartQuantity += 1;
      saveToLS('cart', state.products);
    },
    getCartFromLS(state) {
      const cartFromLS = getFromLS('cart');
      if (cartFromLS) {
        state.products = cartFromLS;
      }
    },
    countCartSum(state) {
      let sum = 0;
      state.products.forEach(
        (element) => (sum += element.product.currentPrice * element.cartQuantity),
      );
      state.cartSum = sum;
    },
  },
  extraReducers: {
    [getCartFromServer.fulfilled]: (state, action) => {
      if (!action.payload) {
        state.isCartExist = false;
        return;
      }
      if (action.payload) {
        state.products = action.payload;
        state.isCartExist = true;
      }
    },
    [getCartFromServer.rejected]: (state) => {
      console.warn('getCartFromServer error: ', state);
      state.isCartExist = false;
    },
    [addProductToTheCart.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [addProductToTheCart.rejected]: (state) => {
      console.warn('addProductToTheCart error: ', state);
    },
    [decreaseProductQuantity.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [decreaseProductQuantity.rejected]: (state) => {
      console.warn('decreaseProductQuantity error: ', state);
    },
    [deleteProductFromTheCart.fulfilled]: (state, action) => {
      console.log(action);
      state.products = action.payload;
    },
    [deleteProductFromTheCart.rejected]: (state) => {
      console.warn('deleteProductFromTheCart error: ', state);
    },
  },
});

export const {
  countCartSum,
  getCartFromLS,
  addItemToTheCartForNotLog,
  makeLessItemForNotLog,
  makeMoreItemForNotLog,
  removeItemFromTheCartForNotLog,
} = cartSlice.actions;
export default cartSlice.reducer;
