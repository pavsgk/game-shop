import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    modalState: false,
};

const SignModalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openSignModal(state) {
            state.modalState = true;
        },
        closeSignModal(state) {
            state.modalState = false
        },
    },
});

export const {openSignModal, closeSignModal} = SignModalSlice.actions;
export default SignModalSlice.reducer;
