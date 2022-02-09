import {useState, useEffect} from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './ProductsContainer.module.scss';
import instance from '../../api/instance';
import ProductsPlaceholder from '../ProductsPlaceholder/ProductsPlaceholder';

function ProductsContainer() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const {data} = await instance.get('products');
        setProducts(data);
        setIsLoading(false);
      } catch (e) {
        console.warning(e);
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }, []);
  useEffect(() => {
    console.log(products);
  }, [products]);

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
