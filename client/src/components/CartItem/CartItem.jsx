import PropTypes from 'prop-types';
import styles from './CartItem.module.scss';
import {ReactComponent as DeletePic} from '../../assets/svg/delete.svg';
import {ReactComponent as MinusPic} from '../../assets/svg/count_minus.svg';
import {ReactComponent as PlusPic} from '../../assets/svg/count_plus.svg';
import {useDispatch, useSelector} from 'react-redux';
import {
  addProductToTheCart,
  decreaseProductQuantity,
  deleteProductFromTheCart,
  removeItemFromTheCartForNotLog,
  makeLessItemForNotLog,
  makeMoreItemForNotLog,
} from '../../store/reducers/cartReducer';

const CartItem = ({product, cartQuantity}) => {
  const {imageUrls, title, itemNo, currentPrice, _id, quantity} = product;
  const isAuthorized = useSelector((state) => state.user.isAuthorized);

  const dispatch = useDispatch();

  const removeProductFromCart = () => {
    if (isAuthorized) {
      dispatch(deleteProductFromTheCart(_id));
      return;
    }
    dispatch(removeItemFromTheCartForNotLog(itemNo));
  };

  const makeMore = () => {
    if (isAuthorized && cartQuantity < quantity) {
      dispatch(addProductToTheCart(_id));
      return;
    }
    if (cartQuantity < quantity) {
      dispatch(makeMoreItemForNotLog(itemNo));
    }
  };

  const makeLess = () => {
    if (isAuthorized && cartQuantity > 1) {
      dispatch(decreaseProductQuantity(_id));
      return;
    }
    dispatch(makeLessItemForNotLog(itemNo));
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.imgWrapper}>
        <img src={imageUrls[0]} alt="some product pic" />
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.infoWrapperTitle}>
          <p className={styles.infoWrapperTitleText}>{title}</p>
          <span className={styles.infoWrapperTitleCode}>{itemNo}</span>
        </div>
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
        <div className={styles.priceValue}>
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
  product: PropTypes.shape({
    _id: PropTypes.string,
    currentPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    imageUrls: PropTypes.arrayOf(PropTypes.string),
    itemNo: PropTypes.string,
    title: PropTypes.string,
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
  },
};

export default CartItem;
