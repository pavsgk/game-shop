import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';
import userReducer from './reducers/userReducer';
import signInUpReducer from "./reducers/signInUpReducer"

export default configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    signModal: signInUpReducer,
  },
});
