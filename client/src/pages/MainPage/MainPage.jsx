import React from 'react';
import styles from './MainPage.module.scss';
import MainSlider from '../../components/MainSlider/MainSlider';
import Genres from '../../components/Genres/Genres';

function MainPage() {
  return (
    <div className={styles.main}>
      <MainSlider />
      <Genres />
    </div>
  );
}

export default MainPage;
