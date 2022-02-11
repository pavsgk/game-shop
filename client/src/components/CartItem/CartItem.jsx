import styles from './CartItem.module.scss';
import {ReactComponent as DeletePic} from '../../assets/svg/delete.svg';
import {ReactComponent as MinusPic} from '../../assets/svg/count_minus.svg';
import {ReactComponent as PlusPic} from '../../assets/svg/count_plus.svg';
import {useDispatch, useSelector} from 'react-redux';
import {removeItemFromTheCart, makeLessItem, makeMoreItem} from '../../store/reducers/cartReducer';

const CartItem = ({title, imageUrls, itemNo, currentPrice, count}) => {
  const dispatch = useDispatch();

  const removeProductFromCart = () => {
    dispatch(removeItemFromTheCart(itemNo));
  };

  const makeMore = () => {
    dispatch(makeMoreItem(itemNo));
  };

  const makeLess = () => {
    dispatch(makeLessItem(itemNo));
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
            <div onClick={makeLess} className={styles.infoWrapperQuantityBlockMinus}>
              <MinusPic className={styles.infoWrapperQuantityBlockMinusItem} />
            </div>
            <div className={styles.infoWrapperQuantityBlockValue}>{count}</div>
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
          <span>&#8372;</span>
          {count === 1 ? currentPrice : currentPrice * count}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
