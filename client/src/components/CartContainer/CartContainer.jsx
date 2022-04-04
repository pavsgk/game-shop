import CartItem from '../CartItem/CartItem';
import styles from './CartContainer.module.scss';
import {useSelector} from 'react-redux';
import {ReactComponent as CartPic} from '../../assets/svg/cart.svg';
import {Link, useNavigate} from 'react-router-dom';
import Button from '../Button/Button';
import {useEffect} from 'react';

const CartContainer = () => {
  const [cart, sum] = useSelector((state) => [state.cart.products, state.cart.cartSum]);

  const navigate = useNavigate();

  if (cart.length < 1) {
    return (
      <div className={styles.emptyMainWrapper}>
        <div className={styles.emptySvgWrapper}>
          <CartPic className={styles.emptySvgWrapperItem} />
        </div>
        <div className={styles.emptyInfoWrapper}>
          <h1 className={styles.emptyTitle}>Your cart is empty</h1>
          <Link to="/catalog">
            <h3 className={styles.emptyLink}>Keep shopping</h3>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.cartTitleWrapper}>
        <p className={styles.cartTitleWrapperName}>Item summary</p>
        <button className={styles.cartTitleWrapperLink} onClick={() => navigate('/catalog')}>
          Keep shopping
        </button>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.contentItems}>
          {cart.length > 0 && cart.map((item) => <CartItem key={item.product.itemNo} {...item} />)}
        </div>
        <div className={styles.totalPriceWrapper}>
          <div className={styles.totalPriceWrapperItem}>
            <p className={styles.totalPriceWrapperItemText}>Total:</p>
            <div className={styles.totalPriceWrapperItemPrice}>
              <span>{sum} &#8372;</span>
            </div>
          </div>
          <div className={styles.totalPriceWrapperButton}>
            <Button
              className={styles.totalPriceWrapperButtonItem}
              onClick={() => navigate('/checkout')}
              type={'submit'}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartContainer;
