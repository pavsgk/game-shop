import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  requestAddProductToTheCart,
  requestThePresenceOfTheCartOnTheServer,
  requestToAddMoreThanOneProductsToTheCart,
  requestToDecreaseProductQuantity,
  requestToDeleteCart,
  requestToDeleteProductFromTheCart,
  requestToUpdateCartFromLs,
} from '../../api/cart';
import {getFromLS, saveToLS} from '../../utils/localStorage';

const initialState = {
  products: [],
  cartSum: 0,
  cartQuantity: 0,
};

export const getCartFromServer = createAsyncThunk('cart/get', async () => {
  const result = await requestThePresenceOfTheCartOnTheServer();
  return result.products;
});

export const updateCartFromLs = createAsyncThunk('cart/put', async () => {
  const result = await requestToUpdateCartFromLs();
  return result.products;
});

export const addMoreThanOneProductsToTheCart = createAsyncThunk('cart/put', async (cartItem) => {
  const result = await requestToAddMoreThanOneProductsToTheCart(cartItem);
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

export const cleanCart = createAsyncThunk('cart/clean', async () => {
  const result = await requestToDeleteCart();
  return result.data;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToTheCartForNotLog(state, action) {
      const index = state.products.findIndex(
        (elem) => elem.product.itemNo === action.payload.product.itemNo,
      );
      if (index === -1) {
        state.products.push(action.payload);
        saveToLS('cart', state.products);
        return;
      }
      state.products[index].cartQuantity += action.payload.cartQuantity;
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
      state.cartSum = state.products.reduce(
        (prev, {product: {currentPrice}, cartQuantity}) => prev + currentPrice * cartQuantity,
        0,
      );
    },
    countCartQuantity(state) {
      let quantity = 0;
      state.products.forEach((element) => (quantity += element.cartQuantity));
      state.cartQuantity = quantity;
    },
  },
  extraReducers: {
    [getCartFromServer.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [updateCartFromLs.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [addProductToTheCart.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [decreaseProductQuantity.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [deleteProductFromTheCart.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [cleanCart.fulfilled]: (state, action) => {
      state.products = action.payload;
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
  countCartQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
