import styles from './Payment.module.scss';
import OrderingComponent from '../OrderingComponent/OrderingComponent';
import React from 'react';

function Payment() {
  return (
    <div className={styles.payment}>
      <OrderingComponent text={'Credit Card'} />
      <OrderingComponent text={'Cash On Delivery'} />
      <OrderingComponent text={'Cash'} details={'for courier method of delivery only'} />
    </div>
  );
}

export default Payment;
