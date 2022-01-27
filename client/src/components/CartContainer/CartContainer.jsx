import CartItem from '../CartItem/CartItem';
import styles from './CartContainer.module.scss';

const CartContainer = () => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.cartTitleWrapper}>
        <p className={styles.cartTitleWrapperName}>Item summary</p>
        <button className={styles.cartTitleWrapperLink}>Keep shopping</button>
      </div>
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <div className={styles.totalPriceWrapper}>
        <p className={styles.totalPriceWrapperText}>Total</p>
        <div>$ 350.00</div>
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.buttonWrapperItem}>Next</button>
      </div>
    </div>
  );
};

export default CartContainer;
