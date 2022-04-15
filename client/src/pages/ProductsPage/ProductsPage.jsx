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
  const [isBeRequest, setIsBeRequest] = useState(false);

  const productsQuantity = useRef(0);
  const productsLength = useRef(0);
  const isFilter = useRef(false);

  const [currentMain, setCurrentMain] = useState(1);
  const [currentFilter, setCurrentFilter] = useState(1);

  const [isMainFetch, setIsMainFetch] = useState(false);
  const [isFilterFetch, setIsFilterFetch] = useState(false);

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

  function ProcessingOfEnquiries(noFilter, firstFilter) {
    let data = [];
    const queryString = noFilter
      ? `&perPage=12&startPage=${currentMain}`
      : location.search.slice(1, -1) + `&perPage=12&startPage=${currentFilter}`;
    (async () => {
      try {
        setIsLoading(true);

        data = await getFilteredProducts(queryString);

        noFilter ? setCurrentMain(currentMain + 1) : setCurrentFilter(currentFilter + 1);
        productsQuantity.current = data.data.productsQuantity;

        noFilter && isFilter.current === false && setProducts([...products, ...data.data.products]);
        noFilter && isFilter.current === true && setProducts(data.data.products);

        firstFilter && setProducts(data.data.products);
        !firstFilter && !noFilter && setProducts([...products, ...data.data.products]);

        noFilter ? setIsMainFetch(false) : setIsFilterFetch(false);
        noFilter ? (isFilter.current = false) : (isFilter.current = true);

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
    if (location.search.length === 0) {
      setIsMainFetch(true);
      setCurrentMain(1);
      setCurrentFilter(1);
    }
  }, [location.search]);

  useEffect(() => {
    if (isFilterFetch) {
      ProcessingOfEnquiries(false, false);
    }
  }, [isFilterFetch]);

  useEffect(() => {
    if (isMainFetch) {
      ProcessingOfEnquiries(true, false);
    }
  }, [isMainFetch]);

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
