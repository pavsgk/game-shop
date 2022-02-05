import styles from './OrderSummary.module.scss';
import Button from '../Button/Button';
import React from 'react';

function OrderSummary(props) {
  const {subtotal, shipping, total} = props;
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Order Summary</p>
      <div className={styles.details}>
        <p>Subtotal</p>
        <p>
          $<span>{subtotal}</span>
        </p>
      </div>
      <div className={styles.details}>
        <p>Shipping</p>
        <p>
          $<span>{shipping}</span>
        </p>
      </div>
      <div className={styles.total}>
        <p>Total</p>
        <p>
          $<span>{total}</span>
        </p>
      </div>
      <div className={styles.btn}>
        <Button type="submit">edit</Button>
      </div>
    </div>
  );
}

export default OrderSummary;
