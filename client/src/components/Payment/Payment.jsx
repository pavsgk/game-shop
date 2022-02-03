import styles from './Payment.module.scss';
import OrderingComponent from '../OrderingComponent/OrderingComponent';
import Button from '../Button/Button';
import React from 'react';

function Payment() {
  return (
    <div className={styles.payment}>
      <input type="radio" name="payment" id="card" value="payment" />
      <label htmlFor="card">
        <OrderingComponent text={'Credit Card'} />
      </label>
      <input type="radio" name="payment" id="cash-delivery" value="payment" />
      <label htmlFor="cash-delivery">
        <OrderingComponent text={'Cash On Delivery'} />
      </label>
      <input type="radio" name="payment" id="cash" value="payment" />
      <label htmlFor="cash">
        <OrderingComponent text={'Cash'} details={'for courier method of delivery only'} />
      </label>
      <div className={styles.submit}>
        <Button type="submit">submit order</Button>
      </div>
    </div>
  );
}

export default Payment;
