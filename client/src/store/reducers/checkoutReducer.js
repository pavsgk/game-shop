import {createSlice} from '@reduxjs/toolkit';

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

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    switchTab(state, {payload}) {
      if (payload !== state.checkoutActiveTab) {
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
});

export const {updatePaymentInfo, updateShippingMethod, switchTab, updateFields} =
  checkoutSlice.actions;
export default checkoutSlice.reducer;
