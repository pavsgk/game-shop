import {Routes, Route, Navigate} from 'react-router-dom';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MuiTheme from './components/MuiTheme/MuiTheme';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import MainPage from './pages/MainPage/MainPage';
import FavouritePage from './pages/FavouritePage/FavouritePage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import SalePage from './pages/SalePage/SalePage';
import TestPage from './api/test';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {init} from './store/reducers/userReducer';
import {AdminPage} from './pages/AdminPage/AdminPage';
import SignModalContainer from './components/SignModalContainer/SignModalContainer';
import ImagesModal from './components/ImagesModal/ImagesModal';
import OrderConfirmed from './components/OrderConfirmed/OrderConfirmed';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import {getCartFromServer, getCartFromLS, updateCartFromLs} from './store/reducers/cartReducer';
import {getFromLS} from './utils/localStorage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SearchResults from './components/SearchResults/SearchResults';
import RouteTracker from './components/RouteTracker/RouteTracker';
import BreadCrumbs from './components/BreadCrumbs/BreadCrumbs';
import SuccessfullyAddModal from './components/SuccessfullyAddModal/SuccessfullyAddModal';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <ErrorBoundary>
        <MuiTheme>
          <Header />
          <BreadCrumbs />
          <SearchResults />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="catalog/*" element={<ProductsPage />} />
            <Route path="details/*" element={<DetailsPage />} />
            <Route path="wishlist" element={<FavouritePage />} />
            <Route path="sale/*" element={<SalePage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="orderConfirmed" element={<OrderConfirmed />} />
            <Route path="test" element={<TestPage />} />
            <Route path="notFound" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="notFound" replace />} />
          </Routes>
          <SuccessfullyAddModal />
          <RouteTracker />
          <Footer />
          <SignModalContainer />
          <ImagesModal />
        </MuiTheme>
      </ErrorBoundary>
    </div>
  );
}

export default App;
