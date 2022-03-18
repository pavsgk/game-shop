import {useState, useEffect} from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './ProductsContainer.module.scss';
import {getFilteredProducts, getAllProducts} from '../../api/products';
import ProductsPlaceholder from '../ProductsPlaceholder/ProductsPlaceholder';
import {useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import FilterMenu from '../FilterMenu/FilterMenu';

function ProductsContainer({isWishlist, isOpen, closeFilters}) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  let location = useLocation();
  const {wishlist} = useSelector((state) => state.wishlist);

  useEffect(() => {
    (async () => {
      try {
        let data = [];
        if (location.search) {
          data = await getFilteredProducts(location.search.slice(1, -1));
        } else if (isWishlist) {
          data = wishlist;
        } else {
          data = await getAllProducts();
        }
        setProducts(data);
        setIsLoading(false);
      } catch (e) {
        console.warn(e);
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }, [location.search, wishlist]);

  const idItemsInWishlist = wishlist.map((e) => e._id);

  useEffect(() => {
    console.log(location, 'location.search');
  }, [location]);

  return (
    <div className={styles.contentWrapper}>
      <FilterMenu isOpen={isOpen} closeFilters={closeFilters} />
      <div
        className={
          products.length > 0 ? styles.productsContainer : styles.productsContainerWithOutItems
        }>
        {isLoading && <ProductsPlaceholder />}
        {isError && <h3>Something went wrong. Please, try again later</h3>}
        {products.length > 0 ? (
          products.map((item) => {
            if (idItemsInWishlist.includes(item._id)) {
              return <ProductCard key={item.itemNo} item={item} isFavorite={true} />;
            } else return <ProductCard key={item.itemNo} item={item} />;
          })
        ) : (
          <h2>There are no products to your request :(</h2>
        )}
      </div>
    </div>
  );
}

export default ProductsContainer;
