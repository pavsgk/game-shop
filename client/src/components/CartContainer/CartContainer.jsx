import CartItem from '../CartItem/CartItem';
import styles from './CartContainer.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import Button from '../Button/Button';
import {useEffect, useState} from 'react';
import {getCartFromLS, getCartFromServer, updateCartFromLs} from '../../store/reducers/cartReducer';
import {getFromLS, saveToLS} from '../../utils/localStorage';
import Preloader from '../Preloader/Preloader';
import SomethingWentWrong from '../SomethingWentWrong/SomethingWentWrong';
import EmptyCart from '../EmptyCart/EmptyCart';

const CartContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [cart, sum] = useSelector((state) => [state.cart.products, state.cart.cartSum]);
  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItemContent = cart.map((item) => (
    <CartItem
      key={item.product.itemNo}
      {...item}
      setIsError={setIsError}
      setIsLoading={setIsLoading}
    />
  ));

  useEffect(() => {
    if (isAuthorized) {
      const cartFromLS = getFromLS('cart');
      (async () => {
        try {
          setIsLoading(true);
          cartFromLS
            ? await dispatch(updateCartFromLs(cartFromLS))
            : await dispatch(getCartFromServer());
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
    return <EmptyCart />;
  }

  if (isError) {
    return <SomethingWentWrong />;
  }

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <p className={styles.title}>Item summary</p>
        <Link className={styles.link} exact="true" to="/catalog">
          Keep shopping
        </Link>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.itemsBox}>{cartItemContent}</div>
        <div className={styles.priceWrapper}>
          <div className={styles.summaSection}>
            <p className={styles.summaText}>Total:</p>
            <div className={styles.summa}>
              <span>{sum} &#8372;</span>
            </div>
          </div>
          <div className={styles.btnBox}>
            <Button className={styles.btn} onClick={() => navigate('/checkout')} type={'submit'}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartContainer;
