import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
  isValid: false,
  checkoutActiveTab: 0,
  checkoutFields: {
    firstName: '',
    lastName: '',
    country: '',
    postal: '',
    address: '',
    mobile: '',
    city: '',
    email: '',
  },
  shippingMethod: 'Standart',
  shippingPrice: 29.95,
  paymentInfo: 'Cash on delivery',
};

export const getUserFields = createAsyncThunk('checkout/getUserData', async (_, thunkApi) => {
  const {
    user: {userData},
    checkout: {checkoutFields},
  } = thunkApi.getState();
  const fields = {};
  for (const [key, val] of Object.entries(userData)) {
    if (key in checkoutFields) fields[key] = val;
  }
  return fields;
});

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    switchTab(state, {payload}) {
      if (payload !== state.checkoutActiveTab && state.isValid) {
        state.checkoutActiveTab = payload;
      }
    },
    updateFields(state, {payload}) {
      for (const [key, val] of Object.entries(payload)) {
        if (key in state.checkoutFields) state.checkoutFields[key] = val;
      }
      state.isValid = payload.isValid;
    },
    updateShippingMethod(state, {payload}) {
      state.shippingMethod = payload.shippingMethod;
      state.shippingPrice = parseFloat(payload.shippingPrice);
    },
    updatePaymentInfo(state, {payload}) {
      state.paymentInfo = payload;
    },
  },
  extraReducers: {
    [getUserFields.fulfilled]: (state, {payload}) => {
      state.checkoutFields = {...state.checkoutFields, ...payload};
      return state;
    },
  },
});

export const {updatePaymentInfo, updateShippingMethod, switchTab, updateFields} =
  checkoutSlice.actions;
export default checkoutSlice.reducer;
