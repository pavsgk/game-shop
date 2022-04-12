import styles from './SalePage.module.scss';
import React, {useEffect, useRef, useState} from 'react';
import CatalogFilterTools from '../../components/CatalogFilterTools/CatalogFilterTools';
import ProductsContainer from '../../components/ProductsContainer/ProductsContainer';
import {useLocation} from 'react-router-dom';
import {getFilteredProducts} from '../../api/products';
import SomethingWentWrong from '../../components/SomethingWentWrong/SomethingWentWrong';

function SalePage() {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isBeRequest, setIsBeRequest] = useState(false);

  const [isMainFetch, setIsMainFetch] = useState(true);
  const [isFilterFetch, setIsFilterFetch] = useState(false);

  const isFilter = useRef(false);
  const productsQuantity = useRef(0);
  const productsLength = useRef(0);

  const [currentMain, setCurrentMain] = useState(1);
  const [currentFilter, setCurrentFilter] = useState(1);
  let location = useLocation();

  const openFilters = () => {
    setIsOpen(true);
  };
  const closeFilters = () => {
    setIsOpen(false);
  };

  const scrollHand = ({target}) => {
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
    document.addEventListener('scroll', scrollHand);

    return function () {
      document.removeEventListener('scroll', scrollHand);
    };
  }, []);

  useEffect(() => {
    productsLength.current = products.length;
  }, [products]);

  function ProcessingOfEnquiries(mainCatalog, firstFilter) {
    let data = [];
    const queryString = mainCatalog
      ? `&minPreviousPrice=1&maxPreviousPrice=3000&perPage=12&startPage=${currentMain}`
      : location.search.slice(1, -1) +
        `&minPreviousPrice=1&maxPreviousPrice=3000&perPage=12&startPage=${currentFilter}`;
    mainCatalog ? (isFilter.current = false) : (isFilter.current = true);

    (async () => {
      try {
        data = await getFilteredProducts(queryString);
        mainCatalog ? setCurrentMain(currentMain + 1) : setCurrentFilter(currentFilter + 1);
        productsQuantity.current = data.data.productsQuantity;
        firstFilter
          ? setProducts(data.data.products)
          : setProducts([...products, ...data.data.products]);
        mainCatalog ? setIsMainFetch(false) : setIsFilterFetch(false);
        setIsBeRequest(true);
        setIsLoading(false);
        setIsError(false);
      } catch (e) {
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }

  useEffect(() => {
    if (location.search.length > 0) {
      ProcessingOfEnquiries(false, true);
    }
  }, [location.search]);

  useEffect(() => {
    if (isFilterFetch) {
      ProcessingOfEnquiries(false, false);
    }
  }, [isFilterFetch]);

  useEffect(() => {
    if (isMainFetch && location.search.length === 0) {
      ProcessingOfEnquiries(true, false);
    }
  }, [isMainFetch]);

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
