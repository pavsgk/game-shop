import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  modalState: false,
  modalText: '',
};

const SuccessAddModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openSuccessAddModal(state) {
      state.modalState = true;
    },
    closeSuccessAddModal(state) {
      state.modalState = false;
    },
    fillSuccessAddModal(state, action) {
      state.modalText = action.payload;
    },
  },
});

export const {openSuccessAddModal, closeSuccessAddModal, fillSuccessAddModal} =
  SuccessAddModalSlice.actions;
export default SuccessAddModalSlice.reducer;
