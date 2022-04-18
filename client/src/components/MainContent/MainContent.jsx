import MainSlider from '../MainSlider/MainSlider';
import Genres from '../Genres/Genres';
import MainNew from '../MainNew/MainNew';
import MainSale from '../MainSale/MainSale';
import React from 'react';
import PropTypes from 'prop-types';

function MainContent({sliderProducts, genres, newProducts, saleProducts}) {
  return (
    <>
      <MainSlider sliderProducts={sliderProducts} />
      <Genres genres={genres} />
      <MainNew newProducts={newProducts} />
      <MainSale saleProducts={saleProducts} />
    </>
  );
}

MainContent.propTypes = {
  sliderProducts: PropTypes.array,
  genres: PropTypes.array,
  newProducts: PropTypes.array,
  saleProducts: PropTypes.array,
};

export default MainContent;
