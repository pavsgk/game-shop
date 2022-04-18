import React, {useEffect, useState} from 'react';
import styles from './MainPage.module.scss';
import Preloader from '../../components/Preloader/Preloader';
import SomethingWentWrong from '../../components/SomethingWentWrong/SomethingWentWrong';
import {getSliderItems} from '../../api/mainSlider';
import {getAllFilters} from '../../api/filters';
import {getFilteredProducts} from '../../api/products';
import MainContent from '../../components/MainContent/MainContent';

function MainPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [sliderProducts, setSliderProducts] = useState([]);
  const [genres, setGenres] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const contentExist = !isLoading && !isError;

  useEffect(() => {
    (async () => {
      try {
        const sliderResult = await getSliderItems();
        const allFilters = await getAllFilters();
        const newProducts = await getFilteredProducts('perPage=12&sort=-date');
        const saleProducts = await getFilteredProducts('minPreviousPrice=1&maxPreviousPrice=3000');

        setSliderProducts(sliderResult);
        setGenres(allFilters);
        setNewProducts(newProducts.data.products);
        setSaleProducts(saleProducts.data.products);

        setIsLoading(false);
      } catch {
        setIsLoading(false);
        setIsError(true);
      }
    })();

    return () => {
      setIsLoading(false);
      setIsError(false);
    };
  }, []);

  return (
    <div className={styles.main}>
      {contentExist && (
        <MainContent
          sliderProducts={sliderProducts}
          genres={genres}
          newProducts={newProducts}
          saleProducts={saleProducts}
        />
      )}
      {isLoading && <Preloader />}
      {isError && <SomethingWentWrong />}
    </div>
  );
}

export default MainPage;
