import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchProducts} from '../../api/products';

const initialState = {
  isPending: false,
  isError: false,
  isVisible: false,
  queryString: '',
  results: [],
};

const updateQuery = createAsyncThunk('search/updateQuery', (queryString) => queryString);

export const newSearchRequest = createAsyncThunk(
  'search/request',
  async (queryString, {dispatch}) => {
    dispatch(updateQuery(queryString));
    const response = await searchProducts(queryString);
    return response;
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setResultsVisibility(state, {payload}) {
      if (state.results.length) {
        state.isVisible = !!payload;
      } else {
        state.isVisible = false;
      }
    },
  },
  extraReducers: {
    [newSearchRequest.fulfilled]: (state, {payload}) => {
      console.log(state);
      return {...state, isError: false, isPending: false, isVisible: true, results: payload};
    },
    [newSearchRequest.pending]: (state) => {
      return {...state, isError: false, isPending: true, isVisible: true};
    },
    [newSearchRequest.rejected]: (state, {error}) => {
      console.warn('search rejected', error);
      return {...state, isError: true, isPending: false};
    },

    [updateQuery.fulfilled]: (state, {payload}) => {
      if (typeof payload === 'string' && payload) state.queryString = payload;
    },
  },
});

export const {setResultsVisibility} = searchSlice.actions;
export default searchSlice.reducer;
