import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getToken, setAuthToken, getUserData} from '../../api/user';

const initialState = {
  userData: {
    token: '',
    firstName: '',
    lastName: '',
    login: '',
    email: '',
    telephone: '',
    avaratUrl: '',
    isAdmin: false,
  },
  isAuthorized: false,
};

export const newLogin = createAsyncThunk('user/newLogin', async ({loginOrEmail, password}) => {
  const token = await getToken(loginOrEmail, password);
  setAuthToken(token);
  const userData = await getUserData();
  return userData;
});

export const newLoginByToken = createAsyncThunk('user/newLoginByToken', async (token) => {
  setAuthToken(token);
  const userData = await getUserData();
  return userData;
});

export const init = createAsyncThunk('user/init', async (_, {dispatch}) => {
  const token = localStorage.getItem('game-shop-token');
  if (token) dispatch(newLoginByToken(token));
  return;
});

const unauthorize = (state) => {
  state.userData = {...initialState.userData};
  state.isAuthorized = false;
  localStorage.removeItem('game-shop-token');
  setAuthToken(false);
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {...initialState.userData},
    isAuthorized: false,
  },
  reducers: {
    updateUserData(state, {payload}) {
      state.userData = {...state.userData, ...payload};
    },
    logout(state) {
      unauthorize(state);
    },
  },
  extraReducers: {
    [newLogin.fulfilled]: (state, {payload}) => {
      state.userData = payload;
      state.isAuthorized = true;
      localStorage.setItem('game-shop-token', state.userData.token);
    },
    [newLogin.rejected]: (state) => {
      unauthorize(state);
    },

    [newLoginByToken.fulfilled]: (state, {payload}) => {
      state.userData = payload;
      state.isAuthorized = true;
      localStorage.setItem('game-shop-token', state.userData.token);
    },
    [newLoginByToken.rejected]: (state) => {
      unauthorize(state);
    },
  },
});

export const {logout, updateUserData} = userSlice.actions;
export default userSlice.reducer;
