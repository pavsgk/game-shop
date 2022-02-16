import styles from './OrderSummary.module.scss';
import Button from '../Button/Button';
import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

function OrderSummary(props) {
  const [{cartItems}, {shippingPrice}] = useSelector((store) => [store.cart, store.checkout]);

  const subtotal = cartItems.reduce((prev, next) => prev + next.count * next.currentPrice, 0);

  // return null

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Order Summary</p>
      <div className={styles.details}>
        <p>Subtotal</p>
        <p>
          <span>{subtotal} ₴</span>
        </p>
      </div>
      <div className={styles.details}>
        <p>Shipping</p>
        <p>
          <span>{shippingPrice} ₴</span>
        </p>
      </div>
      <div className={styles.total}>
        <p>Total</p>
        <p>
          $<span>{subtotal + shippingPrice} ₴</span>
        </p>
      </div>
      <div className={styles.flexCenter}>
        <Link to="/cart">
          <Button>edit</Button>
        </Link>
      </div>
    </div>
  );
}

export default OrderSummary;
