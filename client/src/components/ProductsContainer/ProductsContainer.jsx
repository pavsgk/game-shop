import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './ProductsContainer.module.scss';
import {getFilteredProducts, getAllProducts} from '../../api/products';
import ProductsPlaceholder from '../ProductsPlaceholder/ProductsPlaceholder';
import {useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import FilterMenu from '../FilterMenu/FilterMenu';

function ProductsContainer({isWishlist, isOpen, closeFilters, isCatalog, isSale}) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  let location = useLocation();
  const {wishlist} = useSelector((state) => state.wishlist);
  const {isAuthorized} = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      try {
        let data = [];
        if (location.search) {
          if (isSale) {
            const filteredProducts = await getFilteredProducts(location.search.slice(1, -1));
            data = filteredProducts.filter(
              (el) => el.previousPrice !== 0 && el.previousPrice !== el.currentPrice,
            );
          } else data = await getFilteredProducts(location.search.slice(1, -1));
        } else if (isWishlist && isAuthorized) {
          data = wishlist;
        } else if (isCatalog) {
          data = await getAllProducts();
        } else if (isSale) {
          const allProducts = await getAllProducts();
          data = allProducts.filter(
            (el) => el.previousPrice !== 0 && el.previousPrice !== el.currentPrice,
          );
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
        {isCatalog && <FilterMenu isOpen={isOpen} closeFilters={closeFilters} />}
        {isSale && <FilterMenu isSale={true} isOpen={isOpen} closeFilters={closeFilters} />}
        <div
          className={
            products.length > 0 ? styles.productsContainer : styles.productsContainerWithOutItems
          }>
          {isLoading && <ProductsPlaceholder />}
          {isError && <h3>Something went wrong. Please, try again later</h3>}
          {products.length < 1 && !isError && <h3>There are no products to your request</h3>}
          {isWishlist &&
            products.map((item) => <ProductCard key={item.itemNo} item={item} isFavorite={true} />)}
          {isCatalog &&
            products.map((item) => {
              if (idItemsInWishlist.includes(item._id)) {
                return <ProductCard key={item.itemNo} item={item} isFavorite={true} />;
              }
              return <ProductCard key={item.itemNo} item={item} />;
            })}
          {isSale &&
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
