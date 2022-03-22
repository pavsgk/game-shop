import styles from './OrderSummary.module.scss';
import Button from '../Button/Button';
import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

function OrderSummary() {
  const [{products}, {shippingPrice}] = useSelector((store) => [store.cart, store.checkout]);

  const subtotal = products.reduce(
    (prev, next) => prev + next.cartQuantity * next.product.currentPrice,
    0,
  );
  const total = subtotal ? subtotal + shippingPrice : 0;

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Order Summary</p>
      <div className={styles.details}>
        <p>Subtotal</p>
        <p>
          <span>{subtotal} &#8372;</span>
        </p>
      </div>
      <div className={styles.details}>
        <p>Shipping</p>
        <p>
          <span>{total ? shippingPrice : 0} &#8372;</span>
        </p>
      </div>
      <div className={styles.total}>
        <p>Total</p>
        <p>
          <span>{total} &#8372;</span>
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
