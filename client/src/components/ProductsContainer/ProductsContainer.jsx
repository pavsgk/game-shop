import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './ProductsContainer.module.scss';
import {getFilteredProducts, getAllProducts} from '../../api/products';
import ProductsPlaceholder from '../ProductsPlaceholder/ProductsPlaceholder';
import {useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import FilterMenu from '../FilterMenu/FilterMenu';
import {openSignModal} from '../../store/reducers/signInUpReducer';
import Preloader from '../Preloader/Preloader';
import {getWishedProducts} from '../../api/wishlist';

function ProductsContainer({isWishlist, isOpen, closeFilters, isCatalog}) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isProductsAbsence, setIsProductsAbsence] = useState(false);

  let location = useLocation();
  const {wishlist} = useSelector((state) => state.wishlist);
  const {isAuthorized} = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      try {
        let data = [];
        if (location.search) {
          data = await getFilteredProducts(location.search.slice(1, -1));
          data.length < 1 ? setIsProductsAbsence(true) : setIsProductsAbsence(false);
        } else if (isWishlist && isAuthorized) {
          data = wishlist;
          data.length < 1 ? setIsProductsAbsence(true) : setIsProductsAbsence(false);
        } else if (isCatalog) {
          data = await getAllProducts();
          data.length < 1 ? setIsProductsAbsence(true) : setIsProductsAbsence(false);
        }
        setProducts(data);
        setIsLoading(false);
      } catch (e) {
        console.warn(e);
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }, [location.search, isAuthorized, wishlist]);

  const idItemsInWishlist = wishlist.map((e) => e._id);

  return (
    <div className={styles.contentProductsWrapper}>
      <div className={isWishlist ? styles.containerWishlist : styles.container}>
        {!isWishlist && <FilterMenu isOpen={isOpen} closeFilters={closeFilters} />}
        <div
          className={
            products.length > 0 ? styles.productsContainer : styles.productsContainerWithOutItems
          }>
          {isLoading && <ProductsPlaceholder />}
          {isError && <h3>Something went wrong. Please, try again later</h3>}
          {products.length < 1 && <h3>There are no products to your request</h3>}
          {isWishlist &&
            products.map((item) => <ProductCard key={item.itemNo} item={item} isFavorite={true} />)}
          {isCatalog &&
            products.map((item) => {
              if (idItemsInWishlist.includes(item._id)) {
                return <ProductCard key={item.itemNo} item={item} isFavorite={true} />;
              }
              return <ProductCard key={item.itemNo} item={item} />;
            })}
        </div>
      </div>
    </div>
  );
}

ProductsContainer.propTypes = {
  closeFilters: PropTypes.func,
  isOpen: PropTypes.bool,
  isWishlist: PropTypes.bool,
};

export default ProductsContainer;
