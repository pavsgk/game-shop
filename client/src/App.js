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

function App() {
  return (
    <div className={styles.app}>
      <MuiTheme>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="catalog" element={<ProductsPage />} />
          <Route path="filter" element={<FilterPage />} />
          <Route path="details" element={<DetailsPage />} />
          <Route path="favourite" element={<FavouritePage />} />
          <Route path="cart" element={<CartPage />} />
        </Routes>
      </MuiTheme>
    </div>
  );
}

export default App;
