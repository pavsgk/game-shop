import CartItem from '../CartItem/CartItem';
import styles from './CartContainer.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {ReactComponent as CartPic} from '../../assets/svg/cart.svg';
import {Link, useNavigate} from 'react-router-dom';
import Button from '../Button/Button';
import {useEffect, useState} from 'react';
import {getCartFromLS, getCartFromServer, updateCartFromLs} from '../../store/reducers/cartReducer';
import {getFromLS, saveToLS} from '../../utils/localStorage';
import Preloader from '../Preloader/Preloader';
import SomethingWentWrong from '../SomethingWentWrong/SomethingWentWrong';

const CartContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [cart, sum] = useSelector((state) => [state.cart.products, state.cart.cartSum]);
  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized) {
      const cartFromLS = getFromLS('cart');
      (async () => {
        try {
          setIsLoading(true);
          cartFromLS ? await dispatch(updateCartFromLs()) : await dispatch(getCartFromServer());
          setIsLoading(false);
          setIsError(false);
        } catch (e) {
          setIsLoading(false);
          setIsError(true);
        }
      })();
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

  if (isError) {
    return <SomethingWentWrong />;
  }

  if (isLoading) {
    return <Preloader />;
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
          {cart.length > 0 &&
            cart.map((item) => (
              <CartItem
                key={item.product.itemNo}
                {...item}
                setIsError={setIsError}
                setIsLoading={setIsLoading}
              />
            ))}
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
