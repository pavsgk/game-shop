import CartItem from '../CartItem/CartItem';
import styles from './CartContainer.module.scss';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {countCartSum} from '../../store/reducers/cartReducer';

const CartContainer = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const sum = useSelector((state) => state.cart.cartSum);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(countCartSum());
  }, [cart]);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.cartTitleWrapper}>
        <p className={styles.cartTitleWrapperName}>Item summary</p>
        <button className={styles.cartTitleWrapperLink}>Keep shopping</button>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.contentItems}>
          {cart.length > 0 && cart.map((item) => <CartItem key={item.itemNo} {...item} />)}
        </div>
        <div className={styles.totalPriceWrapper}>
          <div className={styles.totalPriceWrapperItem}>
            <p className={styles.totalPriceWrapperItemText}>Total:</p>
            <div className={styles.totalPriceWrapperItemPrice}>
              <span>&#8372;</span>
              {sum}
            </div>
          </div>
          <div className={styles.totalPriceWrapperButton}>
            <button className={styles.totalPriceWrapperButtonItem}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartContainer;
