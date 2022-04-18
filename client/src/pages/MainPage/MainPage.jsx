import React, {useEffect, useState} from 'react';
import styles from './MainPage.module.scss';
import MainSlider from '../../components/MainSlider/MainSlider';
import Genres from '../../components/Genres/Genres';
import MainNew from '../../components/MainNew/MainNew';
import MainSale from '../../components/MainSale/MainSale';
import Preloader from '../../components/Preloader/Preloader';
import SomethingWentWrong from '../../components/SomethingWentWrong/SomethingWentWrong';
import {getSliderItems} from '../../api/mainSlider';
import {getAllFilters} from '../../api/filters';
import {getFilteredProducts} from '../../api/products';

function MainPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [sliderProducts, setSliderProducts] = useState([]);
  const [genres, setGenres] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);

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
      {!isLoading && !isError && (
        <>
          <MainSlider sliderProducts={sliderProducts} />
          <Genres genres={genres} />
          <MainNew newProducts={newProducts} />
          <MainSale saleProducts={saleProducts} />
        </>
      )}
      {isLoading && <Preloader />}
      {isError && <SomethingWentWrong />}
    </div>
  );
}

export default MainPage;
