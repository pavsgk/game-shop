import ProductsContainer from '../../components/ProductsContainer/ProductsContainer';
import styles from './ProductsPage.module.scss';
import {useEffect, useState, useRef} from 'react';
import CatalogFilterTools from '../../components/CatalogFilterTools/CatalogFilterTools';
import {useLocation} from 'react-router-dom';
import {getFilteredProducts} from '../../api/products';
import SomethingWentWrong from '../../components/SomethingWentWrong/SomethingWentWrong';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [lastLocationSearch, setLastLocationSearch] = useState('');

  const productsQuantity = useRef(0);
  const productsLength = useRef(0);

  const isFilter = useRef(false);

  const presentMainPage = useRef(1);
  const presentFilterPage = useRef(1);

  const [isMainFetch, setIsMainFetch] = useState(false);
  const [isFilterFetch, setIsFilterFetch] = useState(false);

  let location = useLocation();

  const openFilters = () => {
    setIsOpen(true);
  };
  const closeFilters = () => {
    setIsOpen(false);
  };

  const scrollHandler = ({target}) => {
    const scrollHeight = target.documentElement.scrollHeight;
    const scrollTop = target.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    if (
      scrollHeight - (scrollTop + windowHeight) < 100 &&
      productsLength.current < productsQuantity.current
    ) {
      isFilter.current ? setIsFilterFetch(true) : setIsMainFetch(true);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  useEffect(() => {
    productsLength.current = products.length;
  }, [products]);

  function ProcessingOfEnquiries(noFilter, firstFilter) {
    let data = [];
    const queryString = noFilter
      ? `&perPage=12&startPage=${presentMainPage.current}`
      : location.search.slice(1, -1) + `&perPage=12&startPage=${presentFilterPage.current}`;
    (async () => {
      try {
        setIsLoading(true);
        data = await getFilteredProducts(queryString);

        noFilter ? (presentMainPage.current += 1) : (presentFilterPage.current += 1);
        productsQuantity.current = data.data.productsQuantity;

        noFilter && isFilter.current === false && setProducts([...products, ...data.data.products]);
        noFilter && isFilter.current === true && setProducts(data.data.products);

        firstFilter && setProducts(data.data.products);
        !firstFilter && !noFilter && setProducts([...products, ...data.data.products]);

        noFilter ? setIsMainFetch(false) : setIsFilterFetch(false);
        noFilter ? (isFilter.current = false) : (isFilter.current = true);

        setLastLocationSearch(location.search);
        setIsLoading(false);
        setIsError(false);
      } catch (e) {
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }

  useEffect(() => {
    if (location.search.length > lastLocationSearch.length && presentFilterPage.current > 1) {
      presentFilterPage.current = 1;
    }
    if (location.search.length > 0 && lastLocationSearch !== location.search) {
      ProcessingOfEnquiries(false, true);
    }
    if (location.search.length === 0) {
      setIsMainFetch(true);
      presentMainPage.current = 1;
      presentFilterPage.current = 1;
    }
  }, [location.search]);

  useEffect(() => {
    isFilterFetch && ProcessingOfEnquiries(false, false);
  }, [isFilterFetch]);

  useEffect(() => {
    isMainFetch && ProcessingOfEnquiries(true, false);
  }, [isMainFetch]);

  return (
    <>
      {isError ? (
        <SomethingWentWrong />
      ) : (
        <div className={styles.productsPage}>
          <div>
            <CatalogFilterTools openFilters={openFilters} />
          </div>
          <ProductsContainer
            isOpen={isOpen}
            closeFilters={closeFilters}
            openFilters={openFilters}
            isCatalog={true}
            products={products}
            isLoading={isLoading}
          />
        </div>
      )}
    </>
  );
}

export default ProductsPage;
