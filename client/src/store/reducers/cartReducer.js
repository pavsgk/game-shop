import {createAsyncThunk, createSlice, current} from '@reduxjs/toolkit';
import {
  createRequestOnTheServer,
  requestThePresenceOfTheCartOnTheServer,
  requestAddProductToTheCart,
  requestToDecreaseProductQuantity,
  requestToDeleteProductFromTheCart,
} from '../../api/cart';
import {useSelector} from 'react-redux';
import {getFromLS, saveToLS, removeFromLS} from '../../utils/localStorage';

const initialState = {
  products: [],
  cartSum: 0,
  isCartExist: false,
};

export const createCartOnTheServer = createAsyncThunk('cart/create', async (_id) => {
  const newCart = {
    products: [
      {
        product: _id,
        cartQuantity: 1,
      },
    ],
  };

  const result = await createRequestOnTheServer(newCart);
  console.log(result, 'result');
  return result;
});

export const getCartFromServer = createAsyncThunk('cart/get', async () => {
  return await requestThePresenceOfTheCartOnTheServer();
});

export const addProductToTheCart = createAsyncThunk('cart/add', async (_id) => {
  return await requestAddProductToTheCart(_id);
});

export const decreaseProductQuantity = createAsyncThunk('cart/decrease', async (_id) => {
  return await requestToDecreaseProductQuantity(_id);
});

export const deleteProductFromTheCart = createAsyncThunk('cart/delete', async (_id) => {
  return await requestToDeleteProductFromTheCart(_id);
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
      console.log(action.payload);
      const index = state.products.findIndex((elem) => elem.product.itemNo === action.payload);
      console.log(index);

      if (state.products[index].cartQuantity === 1) {
        return;
      }
      state.products[index].cartQuantity -= 1;
      saveToLS('cart', state.products);
    },
    makeMoreItemForNotLog(state, action) {
      console.log(action.payload);
      const index = state.products.findIndex((elem) => {
        console.log(elem.product.itemNo);
        return elem.product.itemNo === action.payload;
      });
      console.log(index);
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
      console.log('state', state);
      console.log('action', action.payload);
      if (!action.payload.data) {
        console.log('net bazy');
        state.isCartExist = false;
        return;
      }
      if (action.payload.data) {
        state.products = action.payload.data.products;
        state.isCartExist = true;
      }
    },
    [getCartFromServer.rejected]: (state) => {
      console.log(state, 'что то пошло не так');
      state.isCartExist = false;
    },
    [addProductToTheCart.fulfilled]: (state, action) => {
      console.log('state', state);
      console.log('action', action.payload.data.products);
      if (action.payload.status === 200) {
        state.products = action.payload.data.products;
      }
    },
    [addProductToTheCart.rejected]: (state) => {
      console.log(state, 'что то пошло не так');
    },
    [decreaseProductQuantity.fulfilled]: (state, action) => {
      console.log('state', state);
      console.log('action', action.payload.data.products);
      if (action.payload.status === 200) {
        state.products = action.payload.data.products;
      }
    },
    [decreaseProductQuantity.rejected]: (state) => {
      console.log(state, 'что то пошло не так');
    },
    [deleteProductFromTheCart.fulfilled]: (state, action) => {
      console.log('state', state);
      console.log('action', action.payload.data.products);
      if (action.payload.status === 200) {
        state.products = action.payload.data.products;
      }
    },
    [deleteProductFromTheCart.rejected]: (state) => {
      console.log(state, 'что то пошло не так');
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
