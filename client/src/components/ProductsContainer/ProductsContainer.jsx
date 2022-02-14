import {useState, useEffect} from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './ProductsContainer.module.scss';
import {getFilteredProducts, getAllProducts} from '../../api/products';
import ProductsPlaceholder from '../ProductsPlaceholder/ProductsPlaceholder';
import {useLocation} from 'react-router-dom';

function ProductsContainer() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  let location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const data = location.search
          ? await getFilteredProducts(location.search.slice(1, -1))
          : await getAllProducts();
        setProducts(data);
        setIsLoading(false);
      } catch (e) {
        console.warning(e);
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }, [location.search]);

  return (
    <div className={styles.productsContainer}>
      {isLoading && <ProductsPlaceholder />}
      {isError && <h3>Something went wrong. Please, try again later</h3>}
      {products.map((item) => (
        <ProductCard key={item.itemNo} item={item} />
      ))}
    </div>
  );
}

export default ProductsContainer;
