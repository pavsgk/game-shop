import styles from './MainComponent.module.scss';
import React from 'react';
import {ReactComponent as New} from './img/new.svg';

function MainComponent(props) {
  const {name, img, price} = props;
  return (
    <>
      <div className={styles.wrapper}>
        <New className={styles.svg} />
        <img className={styles.img} src={img} alt={name} />
        <div className={styles.info}>
          <p className={styles.name}>{name}</p>
          <p className={styles.price}>
            <span>$</span>
            {price}
          </p>
        </div>
      </div>
    </>
  );
}

export default MainComponent;
