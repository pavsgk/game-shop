import {Routes, Route} from 'react-router-dom';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import MuiTheme from './components/MuiTheme/MuiTheme';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import MainPage from './pages/MainPage/MainPage';
import FavouritePage from './pages/FavouritePage/FavouritePage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import TestPage from './api/test';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {init} from './store/reducers/userReducer';
import {AdminPage} from './pages/AdminPage/AdminPage';
import SignModalContainer from './components/SignModalContainer/SignModalContainer';
import ImagesModal from './components/ImagesModal/ImagesModal';
import {getWishlist} from './store/reducers/wishlistReducer';
import OrderConfirmed from './components/OrderConfirmed/OrderConfirmed';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import {getCartFromServer, getCartFromLS} from './store/reducers/cartReducer';

function App() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.user.isAuthorized);

  useEffect(() => {
    dispatch(init());
    dispatch(getWishlist());
    dispatch(getCartFromLS());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthorized) {
      dispatch(getCartFromServer());
    }
  }, [isAuthorized]);

  return (
    <div className={styles.app}>
      <MuiTheme>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="catalog/*" element={<ProductsPage />} />
          <Route path="details/*" element={<DetailsPage />} />
          <Route path="wishlist" element={<FavouritePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="orderConfirmed" element={<OrderConfirmed />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <SignModalContainer />
        <ImagesModal />
      </MuiTheme>
    </div>
  );
}

export default App;
