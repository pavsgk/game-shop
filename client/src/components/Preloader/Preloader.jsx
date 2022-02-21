import preloader from '../../assets/gif/preloader.gif';
import styles from './Preloader.module.scss';
import React from 'react';

const Preloader = () => {
  return (
    <div className={styles.wrapper}>
      <img src={preloader} className={styles.preloader} alt="preloader" />
    </div>
  );
};

export default Preloader;
