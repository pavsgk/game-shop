import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  addProductToWishlist,
  getWishedProducts,
  removeProductFromWishlist,
} from '../../api/wishlist';

const initialState = {
  wishlist: [],
};

export const getWishlist = createAsyncThunk('wishlist/getWishlist', async (productId) => {
  return await getWishedProducts();
});

export const addWishedProduct = createAsyncThunk('wishlist/addWishedProduct', async (productId) => {
  return await addProductToWishlist(productId);
});

export const removeWishedProduct = createAsyncThunk(
  'wishlist/removeWishedProduct',
  async (productId) => {
    return await removeProductFromWishlist(productId);
  },
);

const wishlistlSlice = createSlice({
  name: 'wishlist',
  initialState,
  extraReducers: {
    [getWishlist.fulfilled]: (state, {payload}) => {
      state.wishlist = payload;
    },
    [addWishedProduct.fulfilled]: (state, {payload}) => {
      state.wishlist = payload;
    },
    [removeWishedProduct.fulfilled]: (state, {payload}) => {
      state.wishlist = payload;
    },
  },
});

export default wishlistlSlice.reducer;
