import styles from './ProductsContainer.module.scss';
import {useEffect, useRef, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {getFilteredProducts} from '../../api/products';
import ProductsContainerItem from '../ProductsContainerItem/ProductsContainerItem';
import PropTypes from 'prop-types';

function ProductsContainer({setIsError, isCatalog, isSale}) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const [lastLocationSearch, setLastLocationSearch] = useState('');
  const productsQuantity = useRef(0);
  const productsLength = useRef(0);

  const isFilter = useRef(false);

  const presentMainPage = useRef(1);
  const presentFilterPage = useRef(1);

  const [isMainFetch, setIsMainFetch] = useState(false);
  const [isFilterFetch, setIsFilterFetch] = useState(false);

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

  function ProcessingOfEnquiries(isNotFilter, isFirstFilter) {
    let data = [];
    const baseUrl =
      (isCatalog && `&perPage=12&startPage=`) ||
      (isSale && `&minPreviousPrice=1&maxPreviousPrice=3000&perPage=12&startPage=`);

    const queryString = isNotFilter
      ? `${baseUrl}` + `${presentMainPage.current}`
      : location.search.slice(1, -1) + `${baseUrl}` + `${presentFilterPage.current}`;

    (async () => {
      try {
        setIsLoading(true);
        data = await getFilteredProducts(queryString);

        isNotFilter ? (presentMainPage.current += 1) : (presentFilterPage.current += 1);
        productsQuantity.current = data.data.productsQuantity;

        isNotFilter &&
          isFilter.current === false &&
          setProducts([...products, ...data.data.products]);
        isNotFilter && isFilter.current === true && setProducts(data.data.products);

        isFirstFilter && setProducts(data.data.products);
        !isFirstFilter && !isNotFilter && setProducts([...products, ...data.data.products]);

        isNotFilter ? setIsMainFetch(false) : setIsFilterFetch(false);
        isNotFilter ? (isFilter.current = false) : (isFilter.current = true);

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
    presentFilterPage.current = 1;

    if (location.search.length > 0 && lastLocationSearch !== location.search) {
      ProcessingOfEnquiries(false, true);
    }
    if (location.search.length === 0) {
      setIsMainFetch(true);
      presentMainPage.current = 1;
    }
  }, [location.search]);

  useEffect(() => {
    isFilterFetch && ProcessingOfEnquiries(false, false);
  }, [isFilterFetch]);

  useEffect(() => {
    isMainFetch && ProcessingOfEnquiries(true, false);
  }, [isMainFetch]);

  return (
    <div className={styles.productsPage}>
      <ProductsContainerItem
        isCatalog={isCatalog}
        products={products}
        isLoading={isLoading}
        isSale={isSale}
      />
    </div>
  );
}

ProductsContainer.propTypes = {
  isCatalog: PropTypes.bool,
  isSale: PropTypes.bool,
  setIsError: PropTypes.func,
};

export default ProductsContainer;
