import FilterMenu from '../../components/FilterMenu/FilterMenu';
import ProductsContainer from '../../components/ProductsContainer/ProductsContainer';
import styles from './ProductsPage.module.scss';

function ProductsPage() {
  return (
    <div className={styles.productsPage}>
      <FilterMenu />
      <ProductsContainer />
    </div>
  );
}

export default ProductsPage;
