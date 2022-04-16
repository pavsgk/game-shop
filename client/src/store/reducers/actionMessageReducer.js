import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  modalState: false,
  type: '',
  text: '',
};

const actionMessageSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    switchActionMessage(state) {
      state.modalState = !state.modalState;
    },
    addTypeActionMessage(state, action) {
      state.type = action.payload;
    },
    addTextActionMessage(state, action) {
      state.text = action.payload;
    },
  },
});

export const {switchActionMessage, addTypeActionMessage, addTextActionMessage} =
  actionMessageSlice.actions;
export default actionMessageSlice.reducer;
