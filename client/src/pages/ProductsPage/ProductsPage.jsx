import ProductsContainer from '../../components/ProductsContainer/ProductsContainer';
import styles from './ProductsPage.module.scss';
import {useState} from 'react';
import CatalogFilterTools from '../../components/CatalogFilterTools/CatalogFilterTools';

function ProductsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const openFilters = () => {
    setIsOpen(true);
  };
  const closeFilters = () => {
    setIsOpen(false);
  };
  return (
    <div className={styles.productsPage}>
      <div className={styles.filterToolsWrapper}>
        <CatalogFilterTools openFilters={openFilters} />
      </div>
      <ProductsContainer
        isOpen={isOpen}
        closeFilters={closeFilters}
        openFilters={openFilters}
        isCatalog={true}
      />
    </div>
  );
}

export default ProductsPage;
