import ProductsContainer from '../../components/ProductsContainer/ProductsContainer';
import styles from './ProductsPage.module.scss';
import {useEffect, useState} from 'react';
import CatalogFilterTools from '../../components/CatalogFilterTools/CatalogFilterTools';
import {useLocation} from 'react-router-dom';
import {getAllProducts, getFilteredProducts} from '../../api/products';
import SomethingWentWrong from '../../components/SomethingWentWrong/SomethingWentWrong';

function ProductsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [products, setProducts] = useState([]);
  const [isBeRequest, setIsBeRequest] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
          data = await getFilteredProducts(location.search.slice(1, -1));
          console.log(data, 'filteredData');
        } else {
          data = await getAllProducts();
          console.log(data, 'data');
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
        <div className={styles.productsPage}>
          <div className={styles.filterToolsWrapper}>
            <CatalogFilterTools openFilters={openFilters} />
          </div>
          <ProductsContainer
            isOpen={isOpen}
            closeFilters={closeFilters}
            openFilters={openFilters}
            isCatalog={true}
            products={products}
            isLoading={isLoading}
            isBeRequest={isBeRequest}
          />
        </div>
      )}
    </>
  );
}

export default ProductsPage;
