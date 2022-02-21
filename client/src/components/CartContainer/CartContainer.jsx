import CartItem from '../CartItem/CartItem';
import styles from './CartContainer.module.scss';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {countCartSum, getCartFromServer} from '../../store/reducers/cartReducer';
import {ReactComponent as CartPic} from '../../assets/svg/cart.svg';

const CartContainer = () => {
  const cart = useSelector((state) => state.cart.products);
  const sum = useSelector((state) => state.cart.cartSum);
  const isAuthorized = useSelector((state) => state.user.isAuthorized);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(countCartSum());
  }, [cart]);

  useEffect(() => {
    if (isAuthorized) {
      getCartFromServer();
    }
  }, []);

  if (cart.length < 1) {
    return (
      <div className={styles.emptyMainWrapper}>
        <div className={styles.emptySvgWrapper}>
          <CartPic className={styles.emptySvgWrapperItem} />
        </div>
        <h1 className={styles.emptyTitle}>Your cart is empty</h1>
      </div>
    );
  }

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.cartTitleWrapper}>
        <p className={styles.cartTitleWrapperName}>Item summary</p>
        <button className={styles.cartTitleWrapperLink}>Keep shopping</button>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.contentItems}>
          {cart.length > 0 && cart.map((item) => <CartItem key={item.product.itemNo} {...item} />)}
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
