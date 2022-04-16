import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';
import userReducer from './reducers/userReducer';
import signInUpReducer from './reducers/signInUpReducer';
import checkoutReducer from './reducers/checkoutReducer';
import imagesModalReducer from './reducers/imagesModalReducer';
import wishlistReducer from './reducers/wishlistReducer';
import searchReducer from './reducers/searchReducer';
import actionMessageReducer from './reducers/actionMessageReducer';

export default configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    signModal: signInUpReducer,
    checkout: checkoutReducer,
    imagesModal: imagesModalReducer,
    wishlist: wishlistReducer,
    search: searchReducer,
    actionMessage: actionMessageReducer,
  },
});
