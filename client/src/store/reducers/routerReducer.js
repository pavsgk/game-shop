import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  history: [],
};

const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    pushHistory(state, {payload}) {
      if (state.history.length) {
        if (
          state.history[state.history.length - 1].pathname === payload.pathname &&
          state.history[state.history.length - 1].search === payload.search
        )
          return state;
      }
      state.history.push(payload);
      return state;
    },
    popHistory(state) {
      state.history.pop();
      return state;
    },
  },
});

export const {pushHistory, popHistory} = routerSlice.actions;
export default routerSlice.reducer;
