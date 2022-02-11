import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isValid: false,
  checkoutActiveTab: 0,
  checkoutFields: {
    firstName: '',
    lastName: '',
    country: '',
    zipCode: '',
    address: '',
    phone: '',
    test: '',
  },
  shippingMethod: 'Standart',
  shippingPrice: 29.95,
  paymentMethod: 'Cash on delivery',
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    switchTab(state, {payload}) {
      if (state.isValid && payload !== state.checkoutActiveTab) {
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
    updatePaymentMethod(state, {payload}) {
      state.paymentMethod = payload;
    },
  },
});

export const {updatePaymentMethod, updateShippingMethod, switchTab, updateFields} =
  checkoutSlice.actions;
export default checkoutSlice.reducer;
