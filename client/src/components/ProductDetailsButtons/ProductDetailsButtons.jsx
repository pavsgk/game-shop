import styles from './ProductDetailsButtons.module.scss';
import {ReactComponent as MinusPic} from '../../assets/svg/count_minus.svg';
import {ReactComponent as PlusPic} from '../../assets/svg/count_plus.svg';
import Button from '../Button/Button';

function ProductDetailsButtons(props) {
  const {quantity, setCountInputValue, countInputValue, addToCart, switchWishItem, isFavourite} =
    props;

  return (
    <div className={styles.buttonsWrapper}>
      <div className={styles.infoWrapperQuantity}>
        <div className={styles.infoWrapperQuantityItem}>Quantity:{quantity}</div>
        <div className={styles.infoWrapperQuantityBlock}>
          <div
            onClick={() => countInputValue > 1 && setCountInputValue(countInputValue - 1)}
            className={
              countInputValue <= 1
                ? styles.infoWrapperQuantityBlockMinusNotWork
                : styles.infoWrapperQuantityBlockMinus
            }>
            <MinusPic
              className={
                countInputValue <= 1
                  ? styles.infoWrapperQuantityBlockMinusItemNotWork
                  : styles.infoWrapperQuantityBlockMinusItem
              }
            />
          </div>
          <input
            className={styles.infoWrapperQuantityBlockInput}
            type="text"
            value={countInputValue}
            onChange={({target}) => {
              setCountInputValue('');
              if (!isNaN(target.value) && target.value <= quantity && target.value > 0) {
                setCountInputValue(Number(target.value));
              }
            }}
            onBlur={() => {
              countInputValue === '' && setCountInputValue(1);
            }}
          />
          <div
            onClick={() => countInputValue < quantity && setCountInputValue(countInputValue + 1)}
            className={styles.infoWrapperQuantityBlockPlus}>
            <PlusPic className={styles.infoWrapperQuantityBlockPlusItem} />
          </div>
          <Button onClick={addToCart} type={'button'} className={styles.infoWrapperQuantity_Button}>
            add to cart
          </Button>
        </div>
      </div>
      <div className={styles.wishlistWrapper}>
        <Button onClick={switchWishItem} type={'button'} className={styles.wishlistWrapper_Item}>
          {isFavourite ? 'remove from wishlist' : 'add to wishlist'}
        </Button>
      </div>
    </div>
  );
}

export default ProductDetailsButtons;
