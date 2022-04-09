import styles from './SalePage.module.scss';
import React, {useEffect, useState} from 'react';
import CatalogFilterTools from '../../components/CatalogFilterTools/CatalogFilterTools';
import ProductsContainer from '../../components/ProductsContainer/ProductsContainer';
import {useLocation} from 'react-router-dom';
import {getAllProducts, getFilteredProducts} from '../../api/products';
import SomethingWentWrong from '../../components/SomethingWentWrong/SomethingWentWrong';

function SalePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [products, setProducts] = useState([]);
  const [isBeRequest, setIsBeRequest] = useState(false);
  let location = useLocation();

  const openFilters = () => {
    setIsOpen(true);
  };
  const closeFilters = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    let data = [];
    setIsBeRequest(false);
    (async () => {
      try {
        setIsLoading(true);
        if (location.search) {
          const filteredProducts = await getFilteredProducts(location.search.slice(1, -1));
          data = filteredProducts.filter(
            (el) => !(el.previousPrice === 0) && el.previousPrice !== el.currentPrice,
          );
        } else {
          const allProducts = await getAllProducts();
          data = allProducts.filter(
            (el) => el.previousPrice !== 0 && el.previousPrice !== el.currentPrice,
          );
        }
        setProducts(data);
        setIsBeRequest(true);
        setIsLoading(false);
        setIsError(false);
      } catch (e) {
        console.warn(e);
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }, [location.search]);

  return (
    <>
      {isError ? (
        <SomethingWentWrong />
      ) : (
        <div className={styles.salePage}>
          <div className={styles.filterToolsWrapper}>
            <CatalogFilterTools openFilters={openFilters} />
          </div>
          <ProductsContainer
            isOpen={isOpen}
            closeFilters={closeFilters}
            openFilters={openFilters}
            isSale={true}
            products={products}
            isLoading={isLoading}
            isBeRequest={isBeRequest}
          />
        </div>
      )}
    </>
  );
}

export default SalePage;
