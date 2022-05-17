import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  requestAddProductToTheCart,
  requestToGetCart,
  requestAddProductsToTheCart,
  requestToDecreaseProductQuantity,
  requestToDeleteCart,
  requestToDeleteProductFromTheCart,
  requestToUpdateCart,
} from '../../api/cart';
import {getFromLS, saveToLS} from '../../utils/localStorage';

const initialState = {
  products: [],
  cartSum: 0,
  cartQuantity: 0,
};

export const getCartFromServer = createAsyncThunk('cart/get', async () => {
  const result = await requestToGetCart();
  return result.products;
});

export const updateCartFromLs = createAsyncThunk('cart/put', async (cartFromLS) => {
  const result = await requestToUpdateCart(cartFromLS);
  return result.products;
});

export const addProductsToTheCart = createAsyncThunk('cart/put', async (cartItem) => {
  const result = await requestAddProductsToTheCart(cartItem);
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
    addItemToTheCartNotLog(state, action) {
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
    removeItemFromTheCartNotLog(state, action) {
      const index = state.products.findIndex((elem) => elem.product.itemNo === action.payload);
      if (index === -1) {
        return;
      }
      state.products.splice(index, 1);
      saveToLS('cart', state.products);
    },
    makeLessItemNotLog(state, action) {
      const index = state.products.findIndex((elem) => elem.product.itemNo === action.payload);
      if (state.products[index].cartQuantity === 1) {
        return;
      }
      state.products[index].cartQuantity -= 1;
      saveToLS('cart', state.products);
    },
    makeMoreItemNotLog(state, action) {
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
      if (Array.isArray(state.products)) {
        state.cartSum = state.products.reduce(
          (prev, {product: {currentPrice}, cartQuantity}) => prev + currentPrice * cartQuantity,
          0,
        );
      } else {
        state.cartSum = 0;
      }
    },
    countCartQuantity(state) {
      if (Array.isArray(state.products)) {
        let quantity = 0;
        state.products.forEach((element) => (quantity += element.cartQuantity));
        state.cartQuantity = quantity;
      } else {
        state.cartQuantity = 0;
      }
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
      localStorage.removeItem('cart');
      state.products = [];
    },
    [cleanCart.rejected]: (state) => {
      localStorage.removeItem('cart');
      state.products = [];
    },
  },
});

export const {
  countCartSum,
  getCartFromLS,
  addItemToTheCartNotLog,
  makeLessItemNotLog,
  makeMoreItemNotLog,
  removeItemFromTheCartNotLog,
  countCartQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
