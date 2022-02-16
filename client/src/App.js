import {Routes, Route} from 'react-router-dom';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import MuiTheme from './components/MuiTheme/MuiTheme';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import FilterPage from './pages/FilterPage/FilterPage';
import MainPage from './pages/MainPage/MainPage';
import FavouritePage from './pages/FavouritePage/FavouritePage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import TestPage from './api/test';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {init} from './store/reducers/userReducer';
import {AdminPage} from './pages/AdminPage/AdminPage';
import SignModalContainer from './components/SignModalContainer/SignModalContainer';
import ImagesModal from './components/ImagesModal/ImagesModal';
import OrderConfirmed from './components/OrderConfirmed/OrderConfirmed';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <MuiTheme>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="catalog/*" element={<ProductsPage />} />
          <Route path="details" element={<DetailsPage />} />
          <Route path="favourite" element={<FavouritePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="orderConfirmed" element={<OrderConfirmed />} />
          <Route path="test" element={<NotFoundPage />} />
        </Routes>
        <SignModalContainer />
        <ImagesModal />
      </MuiTheme>
    </div>
  );
}

export default App;
