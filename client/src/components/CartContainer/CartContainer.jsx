import CartItem from '../CartItem/CartItem';
import styles from './CartContainer.module.scss';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {countCartSum, getCartFromServer} from '../../store/reducers/cartReducer';
import {ReactComponent as CartPic} from '../../assets/svg/cart.svg';
import {Link, useNavigate} from 'react-router-dom';

const CartContainer = () => {
  const [cart, sum, isAuthorized] = useSelector((state) => [
    state.cart.products,
    state.cart.cartSum,
    state.user.isAuthorized,
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(countCartSum());
  }, [cart, dispatch, isAuthorized]);

  useEffect(() => {
    if (isAuthorized) {
      getCartFromServer();
    }
  }, [isAuthorized]);

  if (cart.length < 1) {
    return (
      <div className={styles.emptyMainWrapper}>
        <div className={styles.emptySvgWrapper}>
          <CartPic className={styles.emptySvgWrapperItem} />
        </div>
        <div>
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
              <span>&#8372;</span>
              {sum}
            </div>
          </div>
          <div className={styles.totalPriceWrapperButton}>
            <button
              className={styles.totalPriceWrapperButtonItem}
              onClick={() => navigate('/checkout')}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartContainer;
