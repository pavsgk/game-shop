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
        state.products = action.payload.products;
        state.isCartExist = true;
      }
    },
    [getCartFromServer.rejected]: (state) => {
      console.warn('getCartFromServer error: ', state);
      state.isCartExist = false;
    },
    [addProductToTheCart.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.products = action.payload.data.products;
      }
    },
    [addProductToTheCart.rejected]: (state) => {
      console.warn('addProductToTheCart error: ', state);
    },
    [decreaseProductQuantity.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.products = action.payload.data.products;
      }
    },
    [decreaseProductQuantity.rejected]: (state) => {
      console.warn('decreaseProductQuantity error: ', state);
    },
    [deleteProductFromTheCart.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.products = action.payload.data.products;
      }
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
