import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  imagesModalState: false,
  imagesModalContent: [],
};

const imagesModalSlice = createSlice({
  name: 'imagesModal',
  initialState,
  reducers: {
    switchImagesModalState(state) {
      state.imagesModalState = !state.imagesModalState;
    },
    addContentForImagesModal(state, action) {
      state.imagesModalContent = action.payload;
    },
  },
});

export const {switchImagesModalState, addContentForImagesModal} = imagesModalSlice.actions;
export default imagesModalSlice.reducer;
