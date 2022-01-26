import styles from './OrderingComponent.module.scss';
import React from 'react';

const OrderingComponent = (props) => {
  const {text, details, price} = props;

  return (
    <div className={styles.component}>
      <div className={styles.info}>
        <p className={styles.text}>{text}</p>
        <p className={styles.details}>{details}</p>
      </div>
      <p className={styles.price}>{price}</p>
    </div>
  );
};

export default OrderingComponent;
