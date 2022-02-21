import React, {useEffect, useState, useRef} from 'react';
import {ReactComponent as RightArrow} from '../../assets/svg/rightArrow.svg';
import {ReactComponent as LeftArrow} from '../../assets/svg/leftArrow.svg';
import styles from './modalSlider.module.scss';

const ModalSlider = ({modalContent}) => {
  const sliderImages = modalContent.map((item) => {
    return {image: item};
  });

  const [current, setCurrent] = useState(0);
  const length = sliderImages.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(sliderImages) || sliderImages.length <= 0) {
    return null;
  }

  return (
    <section className={styles.slider}>
      <LeftArrow className={styles.leftArrow} onClick={prevSlide} />
      {sliderImages.map((slide, index) => {
        return (
          <div className={index === current ? styles.slideActive : styles.slide} key={slide.image}>
            {index === current && (
              <img src={slide.image} alt="game image" className={styles.image} />
            )}
          </div>
        );
      })}
      <RightArrow className={styles.rightArrow} onClick={nextSlide} />
    </section>
  );
};

export default ModalSlider;
