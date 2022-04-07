import styles from './SalePage.module.scss';
import React, {useState} from 'react';
import CatalogFilterTools from '../../components/CatalogFilterTools/CatalogFilterTools';
import ProductsContainer from '../../components/ProductsContainer/ProductsContainer';

function SalePage() {
  const [isOpen, setIsOpen] = useState(false);
  const openFilters = () => {
    setIsOpen(true);
  };
  const closeFilters = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.salePage}>
      <div className={styles.filterToolsWrapper}>
        <CatalogFilterTools openFilters={openFilters} />
      </div>
      <ProductsContainer
        isOpen={isOpen}
        closeFilters={closeFilters}
        openFilters={openFilters}
        isSale={true}
      />
    </div>
  );
}

export default SalePage;
