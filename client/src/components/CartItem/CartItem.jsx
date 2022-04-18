import PropTypes from 'prop-types';
import styles from './CartItem.module.scss';
import {ReactComponent as DeletePic} from '../../assets/svg/delete.svg';
import {ReactComponent as MinusPic} from '../../assets/svg/count_minus.svg';
import {ReactComponent as PlusPic} from '../../assets/svg/count_plus.svg';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {
  addProductToTheCart,
  decreaseProductQuantity,
  deleteProductFromTheCart,
  removeItemFromTheCartNotLog,
  makeLessItemNotLog,
  makeMoreItemNotLog,
} from '../../store/reducers/cartReducer';

const CartItem = ({product, cartQuantity, setIsError, setIsLoading}) => {
  const {imageUrls, title, itemNo, currentPrice, _id, quantity} = product;
  const isAuthorized = useSelector((state) => state.user.isAuthorized);

  const dispatch = useDispatch();

  const removeProductFromCart = () => {
    if (isAuthorized) {
      (async () => {
        try {
          setIsLoading(true);
          await dispatch(deleteProductFromTheCart(_id));
          setIsLoading(false);
          setIsError(false);
        } catch (e) {
          setIsLoading(false);
          setIsError(true);
        }
      })();
      return;
    }
    dispatch(removeItemFromTheCartNotLog(itemNo));
  };

  const makeMore = () => {
    if (isAuthorized && cartQuantity < quantity) {
      (async () => {
        try {
          setIsLoading(true);
          await dispatch(addProductToTheCart(_id));
          setIsLoading(false);
          setIsError(false);
        } catch (e) {
          setIsLoading(false);
          setIsError(true);
        }
      })();
      return;
    }
    if (cartQuantity < quantity) {
      dispatch(makeMoreItemNotLog(itemNo));
    }
  };

  const makeLess = () => {
    if (isAuthorized && cartQuantity > 1) {
      (async () => {
        try {
          setIsLoading(true);
          await dispatch(decreaseProductQuantity(_id));
          setIsLoading(false);
          setIsError(false);
        } catch (e) {
          setIsLoading(false);
          setIsError(true);
        }
      })();
      return;
    }
    dispatch(makeLessItemNotLog(itemNo));
  };

  return (
    <div className={styles.mainWrapper}>
      <Link to={`/details?${itemNo}`} className={styles.imgWrapper}>
        <img src={imageUrls[0]} alt="some product pic" />
      </Link>
      <div className={styles.infoWrapper}>
        <Link to={`/details?${itemNo}`} className={styles.infoWrapperTitle}>
          <p className={styles.infoWrapperTitleText}>{title}</p>
          <span className={styles.infoWrapperTitleCode}>{itemNo}</span>
        </Link>
        <div className={styles.infoWrapperQuantity}>
          <div className={styles.infoWrapperQuantityBlock}>
            <div
              onClick={makeLess}
              className={
                cartQuantity === 1
                  ? styles.infoWrapperQuantityBlockMinusNotWork
                  : styles.infoWrapperQuantityBlockMinus
              }>
              <MinusPic
                className={
                  cartQuantity === 1
                    ? styles.infoWrapperQuantityBlockMinusItemNotWork
                    : styles.infoWrapperQuantityBlockMinusItem
                }
              />
            </div>
            <div className={styles.infoWrapperQuantityBlockValue}>{cartQuantity}</div>
            <div onClick={makeMore} className={styles.infoWrapperQuantityBlockPlus}>
              <PlusPic className={styles.infoWrapperQuantityBlockPlusItem} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.priceDeleteWrapper}>
        <div className={styles.deleteWrapper} onClick={removeProductFromCart}>
          <DeletePic className={styles.deleteWrapperItem} />
        </div>
        <div className={cartQuantity > 1 ? styles.priceValue : styles.priceValueOneItem}>
          <span>
            {cartQuantity > 1
              ? `${currentPrice} x ${cartQuantity} = ${currentPrice * cartQuantity}`
              : currentPrice}{' '}
            &#8372;
          </span>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  cartQuantity: PropTypes.number,
  setIsError: PropTypes.func,
  setIsLoading: PropTypes.func,
  product: PropTypes.shape({
    _id: PropTypes.string,
    currentPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    imageUrls: PropTypes.arrayOf(PropTypes.string),
    itemNo: PropTypes.string,
    title: PropTypes.string,
    quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
};

CartItem.defaultProps = {
  cartQuantity: 1,
  product: {
    _id: '0',
    currentPrice: 0,
    imageUrls: ['./unknown-w.png'],
    itemNo: '0',
    title: 'unknown',
    quantity: 0,
  },
};

export default CartItem;
