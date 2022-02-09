import CartItem from '../CartItem/CartItem';
import styles from './CartContainer.module.scss';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';

const CartContainer = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const [cartAmount, setCartAmount] = useState(0);

  useEffect(() => {
    let sum = 0;
    console.log(cart);
    cart.forEach((element) => (sum += element.currentPrice * element.count));
    setCartAmount(sum);
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
              {cartAmount}
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
