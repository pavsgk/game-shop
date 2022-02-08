import React from 'react';
import styles from './MainPage.module.scss';
import MainSlider from '../../components/MainSlider/MainSlider';

function MainPage() {
  return (
    <div className={styles.main}>
      <h1>Main Page</h1>
      <MainSlider />
    </div>
  );
}

export default MainPage;
