import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  getWishedProducts,
  addProductToWishlist,
  removeProductFromWishlist,
} from '../../api/wishlist';

const initialState = {
  wishlist: [],
};

export const getWishlist = createAsyncThunk('wishlist/getWishlist', async (productId) => {
  const wishlist = await getWishedProducts(productId);
  return wishlist;
});

export const addWishedProduct = createAsyncThunk('wishlist/addWishedProduct', async (productId) => {
  const wishlist = await addProductToWishlist(productId);
  return wishlist;
});

export const removeWishedProduct = createAsyncThunk(
  'wishlist/removeWishedProduct',
  async (productId) => {
    const wishlist = await removeProductFromWishlist(productId);
    return wishlist;
  },
);

const SignModalSlice = createSlice({
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

export default SignModalSlice.reducer;
