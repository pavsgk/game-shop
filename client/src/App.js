import {Routes, Route} from 'react-router-dom';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import CartPage from './pages/CartPage/CartPage';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import FilterPage from './pages/FilterPage/FilterPage';
import MainPage from './pages/MainPage/MainPage';

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="filter" element={<FilterPage />} />
        <Route path="details" element={<DetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
